"use client";

import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { CameraController } from "@/features/explorer/components/CameraController";
import { PropertyModel } from "@/features/explorer/components/PropertyModel";
import type { CameraConfig } from "@/features/explorer/types/property";

type Props = { modelUrl: string; propertyName: string; initialCamera: CameraConfig; detectedCamera: CameraConfig; onSave: (camera: CameraConfig) => void; onClose: () => void };

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

export function VisualCameraEditor({ modelUrl, propertyName, initialCamera, detectedCamera, onSave, onClose }: Props) {
  const [controls, setControls] = useState<OrbitControlsImpl | null>(null);
  const [camera, setCamera] = useState<CameraConfig>({ position: [...initialCamera.position], target: [...initialCamera.target] });
  useEffect(() => { const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); }; window.addEventListener("keydown", closeOnEscape); return () => window.removeEventListener("keydown", closeOnEscape); }, [onClose]);
  return <div className="visual-camera-editor" role="dialog" aria-modal="true" aria-label="Visual exterior camera editor"><div className="visual-camera-editor-panel"><header><div><span>Exterior camera editor</span><h2>Compose the first view.</h2><p>Drag to orbit, scroll to zoom, then save the framing you want buyers to see first.</p></div><button type="button" onClick={onClose} aria-label="Close camera editor">×</button></header><div className="visual-camera-stage"><Canvas camera={{ position: camera.position, fov: 38, near: 0.1, far: 200 }} dpr={[1, 2]} shadows gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }} onCreated={({ gl }) => gl.setClearColor("#d7d2c8")}><ambientLight intensity={0.8} /><directionalLight position={[7, 12, 8]} intensity={2.4} castShadow shadow-mapSize={[1024, 1024]} /><Suspense fallback={null}><PropertyModel url={modelUrl} cutaway={false} /></Suspense><ContactShadows position={[0, -0.02, 0]} opacity={0.38} scale={24} blur={2.5} far={12} /><CameraController activeCamera={camera} controls={controls} /><CameraPositionCapture controls={controls} onChange={setCamera} /><OrbitControls ref={setControls} makeDefault target={camera.target} minDistance={1} maxDistance={28} minPolarAngle={Math.PI / 7} maxPolarAngle={Math.PI / 2.05} enablePan={false} enableDamping dampingFactor={0.06} /></Canvas><span className="visual-camera-stage-label">{propertyName}</span><span className="visual-camera-gesture">Drag to orbit · Scroll to zoom</span></div><footer><div><span>Current position</span><strong>{camera.position.map((value) => value.toFixed(1)).join(" · ")}</strong></div><div><button type="button" onClick={() => setCamera({ position: [...detectedCamera.position], target: [...detectedCamera.target] })}>Reset to detected view</button><button className="creation-primary" type="button" onClick={() => { onSave(camera); onClose(); }}>Save this framing →</button></div></footer></div></div>;
}
