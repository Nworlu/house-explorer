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

export type SavedCreationSession = { step: CreationStep; draft: PropertyDraft; status: GenerationStatus; propertyId?: string };
