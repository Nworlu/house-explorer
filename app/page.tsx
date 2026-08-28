import Image from "next/image";
import Link from "next/link";
import { SearchField } from "@/components/forms/SearchField";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteNavbar } from "@/components/layout/SiteNavbar";
import { MarketingMotion } from "@/features/marketing/components/MarketingMotion";

const properties = [
  { name: "Coastal Curve Villa", place: "Ada Foah, Ghana", price: "From $1.4m", image: "/test-captures/coastal-curve-villa/01-exterior-front.png" },
  { name: "Courtyard House", place: "Lekki, Lagos", price: "From ₦780m", image: "/images/courtyard-house.webp" },
  { name: "Ocean Garden House", place: "Kokrobite, Ghana", price: "From $980k", image: "/test-captures/coastal-curve-villa/02-exterior-rear.png" },
];

const listings = [
  { name: "Palm Residence", detail: "4 beds · 4 baths · 320 m²", image: "/test-captures/coastal-curve-villa/03-living-room.png" },
  { name: "Ridge House", detail: "3 beds · 3 baths · 248 m²", image: "/test-captures/courtyard-house/01-exterior-front.png" },
  { name: "Lagoon Apartment", detail: "3 beds · 2 baths · 186 m²", image: "/test-captures/coastal-curve-villa/04-kitchen-dining.png" },
  { name: "Garden Pavilion", detail: "4 beds · 5 baths · 402 m²", image: "/test-captures/courtyard-house/02-courtyard.png" },
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
          <h1><span>See the whole home</span><span>before you step inside.</span></h1>
          <span>Explore rooms, floors, and details in one interactive property model.</span>
          <SearchField />
        </div>
        <a className="m-scroll" href="#process">Scroll to discover <span aria-hidden="true">↓</span></a>
      </section>

      <section className="hv-impact" id="process"><div className="hv-impact-copy"><p>Built for better decisions</p><h2>A property listing should explain the space, not just show photographs.</h2><span>HomeView connects listing information, room photography, floor relationships and an interactive model in one browser experience.</span></div><div className="hv-impact-visual"><Image src="/test-captures/coastal-curve-villa/08-hallway-entry.png" alt="Hallway connecting rooms inside Coastal Curve Villa" fill sizes="(max-width: 800px) 100vw, 45vw" /></div><dl><div><dt>360°</dt><dd>Exterior inspection</dd></div><div><dt>Room by room</dt><dd>Guided interior views</dd></div><div><dt>No install</dt><dd>Works in the browser</dd></div></dl></section>

      <section className="hv-properties" id="properties"><header className="hv-section-head"><div><p>Selected homes</p><h2>Properties designed to be understood.</h2></div><span>Each listing pairs photography and property facts with a spatial experience buyers can explore.</span></header><div className="hv-property-grid">{properties.map((property, index) => <article className={index === 0 ? "is-large" : ""} key={property.name}><div><Image src={property.image} alt={property.name} fill sizes={index === 0 ? "(max-width: 800px) 100vw, 55vw" : "(max-width: 800px) 100vw, 28vw"} /></div><span><small>{property.place}</small><h3>{property.name}</h3><b>{property.price}</b><Link href="/explore/demo-house" aria-label={`Explore ${property.name}`}>↗</Link></span></article>)}</div></section>

      <section className="hv-services"><header className="hv-section-head"><div><p>How HomeView works</p><h2>From property photos to an interactive home.</h2></div></header><div className="hv-service-list"><article><strong>Capture the property</strong><p>Upload overlapping exterior and interior views. HomeView identifies missing rooms and connections before processing begins.</p><Link href="/studio/new">Start a capture →</Link></article><article><strong>Review the reconstruction</strong><p>Correct room names, floor assignments and camera viewpoints before the experience is published.</p><Link href="/studio">Open the studio →</Link></article><article><strong>Share one clear listing</strong><p>Buyers move from property facts to the exterior and inside each room without installing an application.</p><Link href="/explore/demo-house">Open the demo →</Link></article></div></section>

      <section className="hv-listings"><header className="hv-section-head"><div><p>Property listings</p><h2>More homes to explore.</h2></div><Link href="/explore/demo-house">View all properties →</Link></header><div>{listings.map((listing) => <article key={listing.name}><div><Image src={listing.image} alt={listing.name} fill sizes="(max-width: 700px) 100vw, 25vw" /></div><h3>{listing.name}</h3><p>{listing.detail}</p><Link href="/explore/demo-house">Explore property ↗</Link></article>)}</div></section>

      <section className="hv-highlight"><div className="hv-highlight-media"><Image src="/images/courtyard-house.webp" alt="Courtyard House interactive model" fill sizes="(max-width: 800px) 100vw, 60vw" /></div><article><p>Highlighted experience</p><h2>See the exterior. Then step inside.</h2><span>Begin with the complete architecture, select a room, and let the model open only when the interior becomes relevant.</span><ul><li>Complete exterior view</li><li>Eight guided room positions</li><li>Responsive orbit and zoom</li></ul><Link href="/explore/demo-house">Explore Courtyard House in 3D ↗</Link></article></section>

      <section className="hv-trust"><blockquote>“The room-by-room views made the layout understandable before we arranged an in-person visit.”</blockquote><div><strong>Property buyer</strong><span>Lagos, Nigeria</span></div></section>

      <section className="hv-faq"><header><p>Common questions</p><h2>Before you explore.</h2></header><div><details open><summary>Can I enter every room?</summary><p>Published rooms appear as guided views. Selecting one moves the camera inside and temporarily opens the model for visibility.</p></details><details><summary>Do I need special hardware?</summary><p>No. HomeView runs in a modern browser and supports mouse, trackpad and touch controls.</p></details><details><summary>Can agents create their own property?</summary><p>Yes. The studio guides agents through media capture, coverage review, processing and publishing.</p></details><details><summary>Are generated models dimensionally exact?</summary><p>Accuracy depends on capture quality and supplied floor plans. Preview models should not replace professional survey documents.</p></details></div></section>

      <section className="m-agent" id="agents"><div><span>For property professionals</span><h2>Turn a listing into a place buyers can explore.</h2></div><p>Upload guided photos of every space, check the capture coverage, then generate and review an interactive property model.</p><Link className="m-agent-action" href="/studio">Open the studio <span>→</span></Link></section>
      <SiteFooter />
    </main>
  );
}
