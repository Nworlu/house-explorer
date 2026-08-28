import type { CaptureRequirement } from "../types/propertyCreation";

export const captureRequirements: CaptureRequirement[] = [
  { id: "exterior", label: "Exterior", guidance: "Front, rear and both sides with overlapping angles.", minimum: 4, accept: "image/*,video/*" },
  { id: "courtyard", label: "Courtyard", guidance: "Walk the perimeter and capture every entrance.", minimum: 2, accept: "image/*,video/*" },
  { id: "living", label: "Living spaces", guidance: "Shoot from each corner and through connecting doors.", minimum: 4, accept: "image/*,video/*" },
  { id: "kitchen", label: "Kitchen & dining", guidance: "Include cabinetry, worktops and room connections.", minimum: 3, accept: "image/*,video/*" },
  { id: "bedroom", label: "Bedrooms", guidance: "Capture every bedroom from at least two corners.", minimum: 4, accept: "image/*,video/*" },
  { id: "bathroom", label: "Bathrooms", guidance: "Include fixtures, doorways and full-height walls.", minimum: 2, accept: "image/*,video/*" },
  { id: "circulation", label: "Hallways & stairs", guidance: "Show how floors and rooms connect.", minimum: 2, accept: "image/*,video/*" },
  { id: "floorplan", label: "Floor plans", guidance: "Optional, but improves scale and room alignment.", minimum: 0, accept: "image/*,.pdf" },
];
