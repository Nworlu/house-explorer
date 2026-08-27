import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import type { Group, Mesh } from "three";

export function PropertyModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    scene.traverse((object) => {
      if ((object as Mesh).isMesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene as Group} />;
}
