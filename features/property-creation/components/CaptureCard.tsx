import Image from "next/image";
import type { CaptureCategory, CaptureFile, CaptureRequirement } from "../types/propertyCreation";

type Props = { requirement: CaptureRequirement & { count: number }; files: CaptureFile[]; onAdd: (category: CaptureCategory, files: FileList | null) => void; onRemove: (id: string) => void };

export function CaptureCard({ requirement, files, onAdd, onRemove }: Props) {
  const complete = requirement.count >= requirement.minimum;
  return <article className={`capture-card ${complete ? "is-complete" : ""}`}><header><span>{complete ? "✓" : requirement.count}</span><div><h3>{requirement.label}</h3><p>{requirement.guidance}</p></div><small>{requirement.minimum ? `${requirement.count}/${requirement.minimum} minimum` : "Optional"}</small></header><div className="capture-previews">{files.map((item) => <div key={item.id}>{item.previewUrl ? <Image src={item.previewUrl} alt="Upload preview" fill unoptimized /> : <span>VIDEO</span>}<button type="button" onClick={() => onRemove(item.id)} aria-label="Remove file">×</button></div>)}<label className="capture-add"><input type="file" multiple accept={requirement.accept} onChange={(event) => { onAdd(requirement.id, event.target.files); event.target.value = ""; }} /><span>+</span><strong>Add media</strong></label></div></article>;
}
