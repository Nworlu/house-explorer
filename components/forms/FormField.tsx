import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type Props = { label: string; hint?: string } & (InputHTMLAttributes<HTMLInputElement> | TextareaHTMLAttributes<HTMLTextAreaElement>);

export function FormField({ label, hint, ...props }: Props) {
  const isTextarea = "rows" in props;
  return <label className="form-field"><span>{label}</span>{isTextarea ? <textarea {...props as TextareaHTMLAttributes<HTMLTextAreaElement>} /> : <input {...props as InputHTMLAttributes<HTMLInputElement>} />}{hint && <small>{hint}</small>}</label>;
}
