import Image from "next/image";
import Link from "next/link";
import { SearchField } from "@/components/forms/SearchField";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { MarketingMotion } from "@/features/marketing/components/MarketingMotion";

const locations = [
  { name: "Banana Island House", place: "Ikoyi, Lagos", price: "₦1.8bn", position: "50% 48%" },
  { name: "Coastal Courtyard", place: "Lekki, Lagos", price: "₦780m", position: "76% 54%" },
  { name: "Parkview Residence", place: "Ikoyi, Lagos", price: "₦950m", position: "24% 50%" },
];

const rooms = [
  ["01", "Living room", "Courtyard-facing · Ground floor"], ["02", "Kitchen & dining", "Open plan · Ground floor"],
  ["03", "Primary suite", "Private terrace · First floor"], ["04", "Guest bedroom", "Garden view · Ground floor"],
];

export default function Home() {
  return (
    <main className="marketing-page">
      <MarketingMotion />
      <section className="m-hero" id="discover">
        <Image className="m-hero-image" src="/images/habitat-hero-clean.webp" alt="Contemporary Lagos residence at blue hour" fill priority sizes="100vw" />
        <div className="m-hero-shade" />
        <SiteNavbar />
        <div className="m-tour-badge"><span className="m-cube" aria-hidden="true">◇</span><span><strong>Interactive 3D tour</strong><small>Ready to explore</small></span></div>
        <div className="m-hero-copy">
          <p>Property, made understandable</p>
          <h1>See the whole home<br />before you step inside.</h1>
          <span>Explore rooms, floors, and details in one interactive property model.</span>
          <SearchField />
        </div>
        <a className="m-scroll" href="#process">Scroll to discover <span aria-hidden="true">↓</span></a>
      </section>

      <section className="m-proof" id="process">
        <div className="m-proof-intro"><span>Why HomeView</span><h2>A clearer way to understand property.</h2><p>We combine architectural storytelling with interactive 3D so buyers can inspect a home with confidence, from anywhere.</p></div>
        <div className="m-proof-main"><h2>Every room, floor, and detail<br />connected to one <em>living model.</em></h2><dl><div><dt>01</dt><dd><strong>Built from property data</strong><span>No hardcoded rooms or camera views.</span></dd></div><div><dt>02</dt><dd><strong>Available in the browser</strong><span>No app or headset required.</span></dd></div><div><dt>03</dt><dd><strong>Ready for real listings</strong><span>One engine for every property.</span></dd></div></dl></div>
      </section>

      <section className="m-feature" id="properties">
        <div className="m-section-heading"><div><span>Featured experience</span><h2>Start with the house.<br />Then go deeper.</h2></div><p>The public listing and the interactive model belong together. Context first, spatial understanding next.</p></div>
        <div className="m-feature-grid">
          <div className="m-feature-image"><Image loading="eager" src="/images/courtyard-house.webp" alt="Courtyard House in Lekki" fill sizes="(max-width: 800px) 100vw, 67vw" /><span>Featured property</span></div>
          <article className="m-feature-card"><span>Courtyard House · Lekki</span><h3>286 m² arranged around light and landscape.</h3><p>A four-bedroom residence with two levels, shaded terraces, and an interactive model ready to inspect.</p><dl><div><dt>Bedrooms</dt><dd>4</dd></div><div><dt>Levels</dt><dd>2</dd></div><div><dt>Interior</dt><dd>286 m²</dd></div></dl><Link className="m-primary-action" href="/explore/demo-house">Explore in 3D <span aria-hidden="true">↗</span></Link></article>
        </div>
      </section>

      <section className="m-room-story" aria-labelledby="room-story-title">
        <div className="m-room-story-copy"><span>Inside the model</span><h2 id="room-story-title">Move through the home, room by room.</h2><p>The 3D tour is more than a spinning model. Select a room to open the architecture, move the camera inside, and understand how each space connects to the courtyard.</p><Link className="m-primary-action" href="/explore/demo-house">Enter the courtyard house <span aria-hidden="true">↗</span></Link></div>
        <div className="m-room-index"><div className="m-plan-mark" aria-hidden="true"><i /><i /><i /><b>Open<br />courtyard</b></div><div className="m-room-list">{rooms.map(([number, name, detail]) => <Link href="/explore/demo-house" key={name}><span>{number}</span><strong>{name}</strong><small>{detail}</small><b aria-hidden="true">→</b></Link>)}</div></div>
      </section>

      <section className="m-locations">
        <div className="m-section-heading"><div><span>Selected addresses</span><h2>Homes worth<br />looking through.</h2></div><Link href="/explore/demo-house" className="m-text-action">View interactive demo <span>→</span></Link></div>
        <div className="m-location-list">
          {locations.map((location, index) => <article className="m-location" key={location.name}><span className="m-location-index">0{index + 1}</span><div className="m-location-visual"><Image src="/images/courtyard-house.webp" alt="" fill sizes="(max-width: 640px) 100vw, 280px" style={{objectPosition: location.position}} /></div><div><h3>{location.name}</h3><p>{location.place}</p><strong>From {location.price}</strong></div><Link href="/explore/demo-house" className="m-location-arrow" aria-label={`Explore ${location.name}`}>↗</Link></article>)}
        </div>
      </section>

      <section className="m-confidence"><div className="m-confidence-heading"><span>Designed for certainty</span><h2>Understand more before arranging a viewing.</h2></div><div className="m-confidence-grid"><article><strong>360°</strong><h3>Spatial context</h3><p>Orbit the complete exterior, inspect the courtyard, then step naturally into each room.</p></article><article><strong>8</strong><h3>Guided viewpoints</h3><p>Jump directly to living spaces, bedrooms, bathrooms and the exterior without getting lost.</p></article><article><strong>1</strong><h3>Connected listing</h3><p>Property facts, architecture and the interactive tour stay together in one clear experience.</p></article></div></section>

      <section className="m-agent" id="agents"><div><span>For property professionals</span><h2>Turn a listing into a place buyers can explore.</h2></div><p>Upload a model, configure the rooms and views, then publish one link that works on every modern device.</p><Link className="m-agent-action" href="/explore/demo-house">See the experience <span>→</span></Link></section>
      <SiteFooter />
    </main>
  );
}
