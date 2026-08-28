"use client";

import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { CameraController } from "@/features/explorer/components/CameraController";
import { PropertyModel } from "@/features/explorer/components/PropertyModel";
import type { CameraConfig } from "@/features/explorer/types/property";

type Props = { modelUrl: string; camera: CameraConfig; propertyName: string };

export function ExteriorCameraPreview({ modelUrl, camera, propertyName }: Props) {
  const [controls, setControls] = useState<OrbitControlsImpl | null>(null);
  return <div className="camera-preview" aria-label={`Live exterior camera framing for ${propertyName}`}>
    <div className="camera-preview-stage">
      <Canvas camera={{ position: camera.position, fov: 38, near: 0.1, far: 200 }} dpr={[1, 1.5]} shadows gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }} onCreated={({ gl }) => gl.setClearColor("#d7d2c8")}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[7, 12, 8]} intensity={2.4} castShadow shadow-mapSize={[512, 512]} />
        <Suspense fallback={null}><PropertyModel url={modelUrl} cutaway={false} /></Suspense>
        <ContactShadows position={[0, -0.02, 0]} opacity={0.38} scale={24} blur={2.5} far={12} />
        <CameraController activeCamera={camera} controls={controls} />
        <OrbitControls ref={setControls} makeDefault target={camera.target} enablePan={false} enableRotate={false} enableZoom={false} />
      </Canvas>
      <span className="camera-preview-reticle" aria-hidden="true" />
      <span className="camera-preview-label">Live camera framing</span>
    </div>
    <div className="camera-preview-meta"><span>Looking toward property centre</span><strong>{camera.position.map((value) => value.toFixed(1)).join(" · ")}</strong></div>
  </div>;
}
