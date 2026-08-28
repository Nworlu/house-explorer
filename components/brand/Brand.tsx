export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className="m-brand">
      {/* Two offset frames, bridged by the sightline: the pair reads as an H. */}
      <svg className="m-brand-mark" viewBox="0 0 42 42" role="presentation" aria-hidden="true">
        <path className="brand-frame" fillRule="evenodd" d="M5 3H19V33H5ZM8.4 6.4V29.6H15.6V6.4Z" />
        <path className="brand-frame brand-frame-inner" fillRule="evenodd" d="M23 9H37V39H23ZM26.4 12.4V35.6H33.6V12.4Z" />
        <path className="brand-sightline" d="M13 19H29V23H13Z" />
      </svg>
      <span>
        <strong>HomeView</strong>
        {!compact && <small>3D property explorer</small>}
      </span>
    </span>
  );
}
