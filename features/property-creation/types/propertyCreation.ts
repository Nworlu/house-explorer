export type CaptureCategory = "exterior" | "courtyard" | "living" | "kitchen" | "bedroom" | "bathroom" | "circulation" | "floorplan";

export type CaptureRequirement = {
  id: CaptureCategory;
  label: string;
  guidance: string;
  minimum: number;
  accept: string;
};

export type CaptureFile = {
  id: string;
  category: CaptureCategory;
  file: File;
  previewUrl?: string;
};

export type PropertyDraft = {
  title: string;
  location: string;
  description: string;
  bedrooms: number;
  floors: number;
};

export type CreationStep = "details" | "capture" | "validate" | "review";
export type GenerationStatus = "idle" | "uploading" | "validating" | "queued" | "reconstructing" | "optimizing" | "review" | "published" | "failed";

export type ValidationSeverity = "error" | "warning" | "ready";
export type CaptureValidationIssue = { id: string; severity: ValidationSeverity; category?: CaptureCategory; title: string; detail: string };
export type CaptureValidationReport = { score: number; totalFiles: number; totalBytes: number; duplicateFiles: number; blockingIssues: number; issues: CaptureValidationIssue[] };

export type SavedCreationSession = { step: CreationStep; draft: PropertyDraft; status: GenerationStatus; propertyId?: string };
