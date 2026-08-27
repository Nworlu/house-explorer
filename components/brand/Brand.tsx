export function Brand({ compact = false }: { compact?: boolean }) {
  return <span className="m-brand"><span className="m-brand-mark" aria-hidden="true">H</span><span><strong>HomeView</strong>{!compact && <small>3D property explorer</small>}</span></span>;
}
