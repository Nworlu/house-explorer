import { Html } from "@react-three/drei";
import type { Hotspot } from "../types/property";

export function HotspotRenderer({ hotspots, onSelect }: { hotspots: Hotspot[]; onSelect: (hotspot: Hotspot) => void }) {
  return <group>{hotspots.map((hotspot) => <Html center key={hotspot.id} position={hotspot.position} distanceFactor={14}><button className="model-hotspot" type="button" aria-label={`View ${hotspot.label}`} onClick={(event) => { event.stopPropagation(); onSelect(hotspot); }}><span>+</span><small>{hotspot.label}</small></button></Html>)}</group>;
}
