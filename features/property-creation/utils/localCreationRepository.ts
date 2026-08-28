import type { Property } from "@/features/explorer/types/property";
import type { CaptureCategory, CaptureFile, PropertyDraft, SavedCreationSession } from "../types/propertyCreation";

const SESSION_KEY = "homeview:creation-session:v1";
const PROPERTY_PREFIX = "homeview:property:";
const DB_NAME = "homeview-captures";
const STORE_NAME = "files";

type StoredFile = { id: string; category: CaptureCategory; file: File };

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => request.result.createObjectStore(STORE_NAME, { keyPath: "id" });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export function saveSession(session: SavedCreationSession) { localStorage.setItem(SESSION_KEY, JSON.stringify(session)); }
export function loadSession(): SavedCreationSession | null { const value = localStorage.getItem(SESSION_KEY); return value ? JSON.parse(value) as SavedCreationSession : null; }
export function clearSession() { localStorage.removeItem(SESSION_KEY); }

export async function saveCaptureFiles(files: CaptureFile[]) {
  const db = await openDb();
  const transaction = db.transaction(STORE_NAME, "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  store.clear();
  files.forEach(({ id, category, file }) => store.put({ id, category, file } satisfies StoredFile));
  await new Promise<void>((resolve, reject) => { transaction.oncomplete = () => resolve(); transaction.onerror = () => reject(transaction.error); });
  db.close();
}

export async function loadCaptureFiles(): Promise<CaptureFile[]> {
  const db = await openDb();
  const request = db.transaction(STORE_NAME, "readonly").objectStore(STORE_NAME).getAll();
  const records = await new Promise<StoredFile[]>((resolve, reject) => { request.onsuccess = () => resolve(request.result as StoredFile[]); request.onerror = () => reject(request.error); });
  db.close();
  return records.map((record) => ({ ...record, previewUrl: record.file.type.startsWith("image/") ? URL.createObjectURL(record.file) : undefined }));
}

export function saveGeneratedProperty(property: Property) { localStorage.setItem(`${PROPERTY_PREFIX}${property.id}`, JSON.stringify(property)); }
export function loadGeneratedProperty(id: string): Property | null { const value = localStorage.getItem(`${PROPERTY_PREFIX}${id}`); return value ? JSON.parse(value) as Property : null; }

export function slugify(value: string) { return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "property"; }

export function createGeneratedProperty(draft: PropertyDraft): Property {
  const id = `${slugify(draft.title)}-${crypto.randomUUID().slice(0, 6)}`;
  const floorCount = Math.max(1, draft.floors);
  const floors = Array.from({ length: floorCount }, (_, index) => ({ id: `floor-${index + 1}`, name: index === 0 ? "Ground floor" : `Floor ${index + 1}`, order: index, meshNames: [] }));
  const rooms = ["Living room", "Kitchen & dining", ...Array.from({ length: draft.bedrooms }, (_, index) => index === 0 ? "Primary bedroom" : `Bedroom ${index + 1}`), "Bathroom"];
  const cameraTemplates = [[-3.8,1.8,7.1],[4,1.85,7],[-3.8,4.85,7],[0,5.35,-1.7],[3.8,4.85,7],[4,5.4,-1.7],[-4,2.3,-1.65]] as [number,number,number][];
  return { id, slug: id, name: draft.title, location: draft.location, description: draft.description || "Generated property preview.", modelUrl: "/models/courtyard-house-demo-v3.glb", thumbnailUrl: "/images/courtyard-house.webp", area: 0, bedrooms: draft.bedrooms, floors, rooms: rooms.map((name, index) => ({ id: slugify(name), name, floorId: floors[Math.min(Math.floor(index / 4), floors.length - 1)].id, camera: { position: cameraTemplates[index % cameraTemplates.length], target: [0, 2, 0] } })), hotspots: [], cameraPresets: [{ id: "exterior-front", name: "Exterior overview", camera: { position: [15, 8.8, 17], target: [0, 2.7, .4] } }] };
}
