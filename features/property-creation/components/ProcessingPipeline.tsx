import type { GenerationStatus } from "../types/propertyCreation";

const stages: { id: GenerationStatus; label: string; detail: string }[] = [
  { id: "uploading", label: "Uploading", detail: "Securing source media" }, { id: "validating", label: "Validating", detail: "Checking image coverage" },
  { id: "queued", label: "Queued", detail: "Preparing reconstruction job" }, { id: "reconstructing", label: "Reconstructing", detail: "Estimating rooms and geometry" },
  { id: "optimizing", label: "Optimizing", detail: "Preparing the browser model" },
];

export function ProcessingPipeline({ status, onRetry, onClose }: { status: GenerationStatus; onRetry: () => void; onClose: () => void }) {
  if (status === "failed") return <div className="processing-overlay" role="alert"><div className="processing-card processing-failed"><span>Processing interrupted</span><h2>Your files are safe.</h2><p>The reconstruction did not finish. Your draft and captures are still stored on this device.</p><div><button type="button" onClick={onClose}>Return to report</button><button className="creation-primary" type="button" onClick={onRetry}>Try again →</button></div></div></div>;
  const current = stages.findIndex((stage) => stage.id === status);
  if (current < 0) return null;
  return <div className="processing-overlay" role="status" aria-live="polite"><div className="processing-card"><span>Model generation</span><h2>{stages[current].label}</h2><p>{stages[current].detail}</p><ol>{stages.map((stage, index) => <li className={index < current ? "is-done" : index === current ? "is-current" : ""} key={stage.id}><i>{index < current ? "✓" : String(index + 1).padStart(2, "0")}</i><span>{stage.label}</span></li>)}</ol><small>This local preview simulates the job contract used by a reconstruction service.</small></div></div>;
}
