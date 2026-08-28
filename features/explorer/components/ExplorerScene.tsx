import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { CameraConfig, Floor, Hotspot } from "../types/property";
import { PropertyModel } from "./PropertyModel";
import { CameraController } from "./CameraController";
import { HotspotRenderer } from "./HotspotRenderer";

type ExplorerSceneProps = { modelUrl: string; initialCamera: CameraConfig; activeCamera: CameraConfig; cutaway: boolean; floors: Floor[]; visibleFloorId: string | null; hotspots: Hotspot[]; onSelectHotspot: (hotspot: Hotspot) => void };

export function ExplorerScene({ modelUrl, initialCamera, activeCamera, cutaway, floors, visibleFloorId, hotspots, onSelectHotspot }: ExplorerSceneProps) {
  const [controls, setControls] = useState<OrbitControlsImpl | null>(null);
  return (
    <Canvas
      camera={{ position: initialCamera.position, fov: 38, near: 0.1, far: 200 }}
      dpr={[1, 2]}
      shadows
      fallback={<div className="scene-error"><span>3D unavailable</span><h2>This browser could not start WebGL.</h2><p>Try refreshing the page or enabling hardware acceleration.</p></div>}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      onCreated={({ gl }) => gl.setClearColor("#d7d2c8")}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[7, 12, 8]} intensity={2.4} castShadow shadow-mapSize={[1024, 1024]} />
      <Suspense fallback={null}><PropertyModel url={modelUrl} cutaway={cutaway} floors={floors} visibleFloorId={visibleFloorId} /></Suspense>
      <HotspotRenderer hotspots={hotspots} onSelect={onSelectHotspot} />
      <ContactShadows position={[0, -0.02, 0]} opacity={0.38} scale={24} blur={2.5} far={12} />
      <CameraController activeCamera={activeCamera} controls={controls} />
      <OrbitControls
        ref={setControls}
        makeDefault target={initialCamera.target} minDistance={1} maxDistance={28}
        minPolarAngle={Math.PI / 7} maxPolarAngle={Math.PI / 2.05}
        enablePan={false} enableDamping dampingFactor={0.06}
      />
    </Canvas>
  );
}
