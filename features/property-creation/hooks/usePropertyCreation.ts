"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { captureRequirements } from "../utils/captureRequirements";
import { generatePropertyPreview, type MockGenerationResult } from "../utils/mockGeneration";
import { clearSession, loadCaptureFiles, loadGeneratedProperty, loadSession, saveCaptureFiles, saveGeneratedProperty, saveSession } from "../utils/localCreationRepository";
import type { Property } from "@/features/explorer/types/property";
import type { CaptureCategory, CaptureFile, CreationStep, GenerationStatus, PropertyDraft } from "../types/propertyCreation";

const initialDraft: PropertyDraft = { title: "", location: "", description: "", bedrooms: 4, floors: 2 };

export function usePropertyCreation() {
  const [step, setStep] = useState<CreationStep>("details");
  const [draft, setDraft] = useState<PropertyDraft>(initialDraft);
  const [files, setFiles] = useState<CaptureFile[]>([]);
  const filesRef = useRef<CaptureFile[]>([]);
  const [status, setStatus] = useState<GenerationStatus>("idle");
  const [result, setResult] = useState<MockGenerationResult | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const coverage = useMemo(() => captureRequirements.map((item) => ({ ...item, count: files.filter((file) => file.category === item.id).length })), [files]);
  const requiredTotal = coverage.reduce((sum, item) => sum + item.minimum, 0);
  const capturedTotal = coverage.reduce((sum, item) => sum + Math.min(item.count, item.minimum), 0);
  const coveragePercent = Math.round((capturedTotal / requiredTotal) * 100);
  const missing = coverage.filter((item) => item.minimum > 0 && item.count < item.minimum);

  useEffect(() => { filesRef.current = files; }, [files]);
  useEffect(() => () => filesRef.current.forEach((item) => item.previewUrl && URL.revokeObjectURL(item.previewUrl)), []);
  useEffect(() => { const restore = async () => { const session = loadSession(); const storedFiles = await loadCaptureFiles(); setFiles(storedFiles); if (session) { setStep(session.step); setDraft(session.draft); setStatus(session.status); if (session.propertyId) { const property = loadGeneratedProperty(session.propertyId); if (property) setResult({ propertyId: property.id, modelUrl: property.modelUrl, roomCount: property.rooms.length, confidence: 92, property }); } } setHydrated(true); }; void restore(); }, []);
  useEffect(() => { if (!hydrated) return; saveSession({ step, draft, status, propertyId: result?.propertyId }); const timer = window.setTimeout(() => void saveCaptureFiles(files), 250); return () => window.clearTimeout(timer); }, [draft, files, hydrated, result?.propertyId, status, step]);

  const addFiles = (category: CaptureCategory, selected: FileList | null) => {
    if (!selected) return;
    const additions = Array.from(selected).map((file) => ({ id: crypto.randomUUID(), category, file, previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined }));
    setFiles((current) => [...current, ...additions]);
  };
  const removeFile = (id: string) => setFiles((current) => current.filter((item) => { if (item.id === id && item.previewUrl) URL.revokeObjectURL(item.previewUrl); return item.id !== id; }));
  const generate = async () => { for (const nextStatus of ["uploading", "validating", "queued", "reconstructing", "optimizing"] as const) { setStatus(nextStatus); await new Promise((resolve) => window.setTimeout(resolve, nextStatus === "reconstructing" ? 850 : 350)); } const generated = await generatePropertyPreview(draft); saveGeneratedProperty(generated.property); setResult(generated); setStatus("review"); setStep("review"); };
  const updateProperty = (property: Property) => { saveGeneratedProperty(property); setResult((current) => current ? { ...current, property, roomCount: property.rooms.length } : current); };
  const publish = () => { if (result) saveGeneratedProperty(result.property); setStatus("published"); };
  const startOver = () => { clearSession(); setStep("details"); setDraft(initialDraft); setFiles([]); setResult(null); setStatus("idle"); void saveCaptureFiles([]); };

  return { step, setStep, draft, setDraft, files, addFiles, removeFile, coverage, coveragePercent, missing, status, result, hydrated, generate, updateProperty, publish, startOver };
}
