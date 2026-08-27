import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { CameraConfig } from "../types/property";

export function CameraController({ activeCamera, controls }: { activeCamera: CameraConfig; controls: OrbitControlsImpl | null }) {
  const camera = useThree((state) => state.camera);

  useEffect(() => {
    if (!controls) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Spatial camera moves need enough time to preserve orientation between exterior and room views.
    const duration = reduced ? 0.01 : 1.35;
    const positionTween = gsap.to(camera.position, {
      x: activeCamera.position[0], y: activeCamera.position[1], z: activeCamera.position[2],
      duration, ease: "power3.inOut", onUpdate: () => controls.update(),
    });
    const targetTween = gsap.to(controls.target, {
      x: activeCamera.target[0], y: activeCamera.target[1], z: activeCamera.target[2],
      duration, ease: "power3.inOut", onUpdate: () => controls.update(),
    });
    return () => { positionTween.kill(); targetTween.kill(); };
  }, [activeCamera, camera, controls]);

  return null;
}
