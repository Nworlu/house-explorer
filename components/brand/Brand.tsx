export function Brand({ compact = false }: { compact?: boolean }) {
  return <span className="m-brand"><svg className="m-brand-mark" viewBox="0 0 64 64" aria-hidden="true"><path className="brand-frame" d="M8 8h37l11 11v37H19L8 45V8Zm11 11v25l5 5h21V25l-6-6H19Z"/><path className="brand-frame brand-frame-inner" d="M25 25h13l5 5v13H25V25Zm6 6v6h6v-5l-1-1h-5Z"/><path className="brand-sightline" d="m15.9 47.5 31-31 3.6 3.6-31 31-3.6-3.6Z"/></svg><span><strong>HomeView</strong>{!compact && <small>3D property explorer</small>}</span></span>;
}
