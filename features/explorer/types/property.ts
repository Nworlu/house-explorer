export type Vector3Tuple = [number, number, number];
export type CameraConfig = { position: Vector3Tuple; target: Vector3Tuple };
/** `meshNames` are matched as name prefixes, so "Living" claims LivingRug, LivingSofaBase and so on. */
export type Floor = { id: string; name: string; order: number; meshNames: string[] };
export type Room = { id: string; name: string; floorId: string; description?: string; area?: number; camera: CameraConfig };
export type Hotspot = { id: string; label: string; description?: string; roomId?: string; type: "feature" | "room" | "material" | "information"; position: Vector3Tuple };
export type CameraPreset = { id: string; name: string; camera: CameraConfig };
export type Property = {
  id: string; slug: string; name: string; location: string; description?: string;
  modelUrl: string; thumbnailUrl?: string; area: number; bedrooms: number;
  floors: Floor[]; rooms: Room[]; hotspots: Hotspot[]; cameraPresets: CameraPreset[];
};
