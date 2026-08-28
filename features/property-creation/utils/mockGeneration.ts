import type { Property } from "@/features/explorer/types/property";
import type { PropertyDraft } from "../types/propertyCreation";
import { createGeneratedProperty } from "./localCreationRepository";

export type MockGenerationResult = { propertyId: string; modelUrl: string; roomCount: number; confidence: number; property: Property };

export async function generatePropertyPreview(property: PropertyDraft): Promise<MockGenerationResult> {
  await new Promise((resolve) => window.setTimeout(resolve, 600));
  const generated = createGeneratedProperty(property);
  return { propertyId: generated.id, modelUrl: generated.modelUrl, roomCount: generated.rooms.length, confidence: 92, property: generated };
}
