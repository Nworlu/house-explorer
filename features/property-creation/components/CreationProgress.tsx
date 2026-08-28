import type { CreationStep } from "../types/propertyCreation";

const steps: { id: CreationStep; label: string }[] = [{ id: "details", label: "Property" }, { id: "capture", label: "Capture" }, { id: "validate", label: "Coverage" }, { id: "review", label: "Review" }];

export function CreationProgress({ current }: { current: CreationStep }) {
  const currentIndex = steps.findIndex((item) => item.id === current);
  return <ol className="creation-progress">{steps.map((item, index) => <li className={index <= currentIndex ? "is-active" : ""} key={item.id}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item.label}</strong></li>)}</ol>;
}
