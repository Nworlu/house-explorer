import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import type { Group, Mesh } from "three";
import type { Floor } from "../types/property";

type PropertyModelProps = { url: string; cutaway: boolean; floors?: Floor[]; visibleFloorId?: string | null };

const isShell = (name: string) => name.startsWith("Exterior") || name.startsWith("Roof");

/** The floor a mesh belongs to, by prefix match, or null when it is shell or shared structure. */
function floorIdForMesh(name: string, floors: Floor[]) {
  return floors.find((floor) => floor.meshNames.some((prefix) => name.startsWith(prefix)))?.id ?? null;
}

export function PropertyModel({ url, cutaway, floors = [], visibleFloorId = null }: PropertyModelProps) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    scene.traverse((object) => {
      if (!(object as Mesh).isMesh) return;
      object.castShadow = true;
      object.receiveShadow = true;

      // Isolating a floor also drops the façade and roof, otherwise the floor stays boxed in.
      if (visibleFloorId) {
        const owner = floorIdForMesh(object.name, floors);
        object.visible = isShell(object.name) ? false : owner === null || owner === visibleFloorId;
        return;
      }

      object.visible = isShell(object.name) ? !cutaway : true;
    });
  }, [cutaway, floors, scene, visibleFloorId]);

  return <primitive object={scene as Group} />;
}
