import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import type { Group, Mesh } from "three";

export function PropertyModel({ url, cutaway }: { url: string; cutaway: boolean }) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    scene.traverse((object) => {
      if ((object as Mesh).isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
      if (object.name.startsWith("Exterior") || object.name.startsWith("Roof")) object.visible = !cutaway;
    });
  }, [cutaway, scene]);

  return <primitive object={scene as Group} />;
}
