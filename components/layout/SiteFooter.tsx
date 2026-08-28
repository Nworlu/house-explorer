import { Brand } from "../brand/Brand";

export function SiteFooter() {
  return <footer className="m-footer"><div><Brand /><p>Property photography, spatial context and interactive 3D in one clear experience.</p></div><nav aria-label="Footer navigation"><a href="#properties">Properties</a><a href="#process">How it works</a><a href="#agents">For agents</a></nav><div><strong>Ready to create a property?</strong><a href="/studio">Open the studio →</a><span>© 2026 HomeView</span></div></footer>;
}
