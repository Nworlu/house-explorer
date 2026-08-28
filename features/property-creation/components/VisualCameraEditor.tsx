"use client";

import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { CameraController } from "@/features/explorer/components/CameraController";
import { PropertyModel } from "@/features/explorer/components/PropertyModel";
import type { CameraConfig, Hotspot, Room, Vector3Tuple } from "@/features/explorer/types/property";

type Props = { modelUrl: string; propertyName: string; initialCamera: CameraConfig; detectedCamera: CameraConfig; rooms: Room[]; onSave: (camera: CameraConfig) => void; onSaveHotspot: (hotspot: Hotspot) => void; onClose: () => void };
const hotspotTypes: Hotspot["type"][] = ["feature", "room", "material", "information"];

function CameraPositionCapture({ controls, onChange }: { controls: OrbitControlsImpl | null; onChange: (camera: CameraConfig) => void }) {
  const camera = useThree((state) => state.camera);
  useEffect(() => {
    if (!controls) return;
    const capture = () => onChange({ position: camera.position.toArray() as [number, number, number], target: controls.target.toArray() as [number, number, number] });
    controls.addEventListener("end", capture);
    return () => controls.removeEventListener("end", capture);
  }, [camera, controls, onChange]);
  return null;
}

export function VisualCameraEditor({ modelUrl, propertyName, initialCamera, detectedCamera, rooms, onSave, onSaveHotspot, onClose }: Props) {
  const [controls, setControls] = useState<OrbitControlsImpl | null>(null);
  const [camera, setCamera] = useState<CameraConfig>({ position: [...initialCamera.position], target: [...initialCamera.target] });
  const [isPlacingHotspot, setIsPlacingHotspot] = useState(false);
  const [draftHotspot, setDraftHotspot] = useState<Hotspot | null>(null);
  useEffect(() => { const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); }; window.addEventListener("keydown", closeOnEscape); return () => window.removeEventListener("keydown", closeOnEscape); }, [onClose]);
  const startHotspotPlacement = () => { setDraftHotspot(null); setIsPlacingHotspot(true); };
  const setHotspotPosition = (position: Vector3Tuple) => { if (!isPlacingHotspot) return; setDraftHotspot({ id: crypto.randomUUID(), label: "", type: "feature", position }); setIsPlacingHotspot(false); };
  const updateHotspot = <K extends "label" | "description" | "type" | "roomId">(field: K, value: Hotspot[K]) => setDraftHotspot((current) => current ? { ...current, [field]: value } : current);
  return <div className="visual-camera-editor" role="dialog" aria-modal="true" aria-label="Visual exterior camera editor"><div className="visual-camera-editor-panel"><header><div><span>Exterior camera editor</span><h2>Compose the first view.</h2><p>Drag to orbit, scroll to zoom, or add a point buyers can inspect.</p></div><button type="button" onClick={onClose} aria-label="Close camera editor">×</button></header><div className="visual-camera-workspace"><div className={`visual-camera-stage${isPlacingHotspot ? " is-placing-hotspot" : ""}`}><Canvas camera={{ position: camera.position, fov: 38, near: 0.1, far: 200 }} dpr={[1, 2]} shadows gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }} onCreated={({ gl }) => gl.setClearColor("#d7d2c8")}><ambientLight intensity={0.8} /><directionalLight position={[7, 12, 8]} intensity={2.4} castShadow shadow-mapSize={[1024, 1024]} /><Suspense fallback={null}><PropertyModel url={modelUrl} cutaway={false} onPointSelect={setHotspotPosition} /></Suspense>{draftHotspot && <mesh position={draftHotspot.position}><sphereGeometry args={[0.16, 20, 20]} /><meshStandardMaterial color="#ef5b54" emissive="#ef5b54" emissiveIntensity={0.5} /></mesh>}<ContactShadows position={[0, -0.02, 0]} opacity={0.38} scale={24} blur={2.5} far={12} /><CameraController activeCamera={camera} controls={controls} /><CameraPositionCapture controls={controls} onChange={setCamera} /><OrbitControls ref={setControls} makeDefault target={camera.target} minDistance={1} maxDistance={28} minPolarAngle={Math.PI / 7} maxPolarAngle={Math.PI / 2.05} enablePan={false} enableDamping dampingFactor={0.06} /></Canvas><span className="visual-camera-stage-label">{isPlacingHotspot ? "Click a point on the property" : propertyName}</span><span className="visual-camera-gesture">Drag to orbit · Scroll to zoom</span></div><aside className="hotspot-editor"><header><span>Property hotspots</span><strong>{draftHotspot ? "Describe this point" : "Add an interactive detail"}</strong></header>{draftHotspot ? <div className="hotspot-editor-form"><label><span>Label</span><input autoFocus value={draftHotspot.label} placeholder="e.g. Kitchen island" onChange={(event) => updateHotspot("label", event.target.value)} /></label><label><span>Type</span><select value={draftHotspot.type} onChange={(event) => updateHotspot("type", event.target.value as Hotspot["type"])}>{hotspotTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select></label><label><span>Room</span><select value={draftHotspot.roomId ?? ""} onChange={(event) => updateHotspot("roomId", event.target.value || undefined)}><option value="">Not linked to a room</option>{rooms.map((room) => <option key={room.id} value={room.id}>{room.name}</option>)}</select></label><label><span>Description</span><textarea rows={3} value={draftHotspot.description ?? ""} placeholder="What should buyers notice?" onChange={(event) => updateHotspot("description", event.target.value)} /></label><div><button type="button" onClick={() => setDraftHotspot(null)}>Discard</button><button className="creation-primary" type="button" disabled={!draftHotspot.label.trim()} onClick={() => { onSaveHotspot(draftHotspot); setDraftHotspot(null); }}>Save hotspot →</button></div></div> : <div className="hotspot-editor-empty"><p>Add details buyers can discover while exploring the home.</p><button className="creation-primary" type="button" onClick={startHotspotPlacement}>{isPlacingHotspot ? "Select a point on model" : "Add hotspot →"}</button></div>}</aside></div><footer><div><span>Current position</span><strong>{camera.position.map((value) => value.toFixed(1)).join(" · ")}</strong></div><div><button type="button" onClick={() => setCamera({ position: [...detectedCamera.position], target: [...detectedCamera.target] })}>Reset to detected view</button><button className="creation-primary" type="button" onClick={() => { onSave(camera); onClose(); }}>Save this framing →</button></div></footer></div></div>;
}
