# Shared UI components

## Brand
`components/brand/Brand.tsx` — reusable HomeView identity.

```tsx
import Image from "next/image";
export function Brand() { return <span className="brand"><Image src="/brand/homeview-mark.svg" alt="" width={32} height={38} /><span><strong>HomeView</strong><small>Property explorer</small></span></span>; }
```

## FormField
`components/forms/FormField.tsx` — labeled input or textarea.

```tsx
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
type Props = { label: string; hint?: string } & (InputHTMLAttributes<HTMLInputElement> | TextareaHTMLAttributes<HTMLTextAreaElement>);
export function FormField({ label, hint, ...props }: Props) { const isTextarea = "rows" in props; return <label className="form-field"><span>{label}</span>{isTextarea ? <textarea {...props as TextareaHTMLAttributes<HTMLTextAreaElement>} /> : <input {...props as InputHTMLAttributes<HTMLInputElement>} />}{hint && <small>{hint}</small>}</label>; }
```
