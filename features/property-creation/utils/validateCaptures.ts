import type { CaptureFile, CaptureRequirement, CaptureValidationIssue, CaptureValidationReport, PropertyDraft } from "../types/propertyCreation";

const IMAGE_LIMIT = 25 * 1024 * 1024;
const VIDEO_LIMIT = 500 * 1024 * 1024;

function supported(item: CaptureFile) {
  const type = item.file.type.toLowerCase();
  const name = item.file.name.toLowerCase();
  return item.category === "floorplan" ? type.startsWith("image/") || type === "application/pdf" || name.endsWith(".pdf") : type.startsWith("image/") || type.startsWith("video/");
}

function readableSize(bytes: number) {
  return bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function validateCaptures(files: CaptureFile[], requirements: Array<CaptureRequirement & { count: number }>, draft: PropertyDraft): CaptureValidationReport {
  const issues: CaptureValidationIssue[] = [];
  const seen = new Set<string>();
  let duplicateFiles = 0;
  files.forEach((item) => {
    const key = `${item.file.name.toLowerCase()}:${item.file.size}:${item.file.lastModified}`;
    if (seen.has(key)) duplicateFiles += 1;
    seen.add(key);
    if (!supported(item)) issues.push({ id: `type-${item.id}`, severity: "error", category: item.category, title: `${item.file.name} cannot be used`, detail: "Use JPG, PNG, WEBP, HEIC, MP4, MOV, or a PDF floor plan." });
    const limit = item.file.type.startsWith("video/") ? VIDEO_LIMIT : IMAGE_LIMIT;
    if (item.file.size > limit) issues.push({ id: `size-${item.id}`, severity: "error", category: item.category, title: `${item.file.name} is too large`, detail: `This file is ${readableSize(item.file.size)}. Use images under 25 MB and videos under 500 MB.` });
    if (item.file.size === 0) issues.push({ id: `empty-${item.id}`, severity: "error", category: item.category, title: `${item.file.name} is empty`, detail: "Remove it and upload the original file again." });
  });
  if (!files.length) issues.push({ id: "no-media", severity: "error", title: "No property media supplied", detail: "Add at least one exterior and one interior capture before processing." });
  if (duplicateFiles) issues.push({ id: "duplicates", severity: "warning", title: `${duplicateFiles} duplicate ${duplicateFiles === 1 ? "file" : "files"} detected`, detail: "Duplicates do not improve reconstruction coverage and will be ignored by the production worker." });
  requirements.forEach((requirement) => {
    if (!requirement.minimum || requirement.count >= requirement.minimum) return;
    const missing = requirement.minimum - requirement.count;
    const blocking = requirement.id === "exterior" || requirement.id === "living";
    issues.push({ id: `coverage-${requirement.id}`, category: requirement.id, severity: blocking ? "error" : "warning", title: `${requirement.label} needs ${missing} more ${missing === 1 ? "capture" : "captures"}`, detail: blocking ? "This space anchors the reconstruction and must be present." : "You can continue with a preview, but this area may contain gaps or incorrect geometry." });
  });
  const bedroomCount = files.filter((item) => item.category === "bedroom").length;
  const bedroomTarget = Math.max(2, draft.bedrooms * 2);
  if (bedroomCount < bedroomTarget) issues.push({ id: "bedroom-count", category: "bedroom", severity: "warning", title: `Coverage does not match ${draft.bedrooms} bedrooms`, detail: `Aim for ${bedroomTarget} bedroom images—at least two corners for each room.` });
  if (!files.some((item) => item.category === "floorplan")) issues.push({ id: "floorplan", category: "floorplan", severity: "warning", title: "No floor plan supplied", detail: "Optional, but a plan improves scale, wall alignment, and floor relationships." });
  const blockingIssues = issues.filter((issue) => issue.severity === "error").length;
  const warnings = issues.filter((issue) => issue.severity === "warning").length;
  const score = Math.max(0, Math.min(100, 100 - blockingIssues * 22 - warnings * 6 - duplicateFiles * 2));
  if (!issues.length) issues.push({ id: "ready", severity: "ready", title: "Capture set ready", detail: "Required spaces, file formats, and upload sizes passed preflight." });
  return { score, totalFiles: files.length, totalBytes: files.reduce((sum, item) => sum + item.file.size, 0), duplicateFiles, blockingIssues, issues };
}
