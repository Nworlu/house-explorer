import Link from "next/link";
import { Brand } from "../brand/Brand";

export function SiteNavbar() {
  return <nav className="m-nav" aria-label="Main navigation"><Link href="/" aria-label="HomeView home"><Brand /></Link><div className="m-nav-links"><a href="#properties">Properties</a><a href="#process">How it works</a><a href="#agents">For agents</a></div><Link className="m-nav-cta" href="/explore/demo-house">Open 3D demo <span aria-hidden="true">↗</span></Link></nav>;
}
