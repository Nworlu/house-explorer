import { mkdir, writeFile } from "node:fs/promises";
import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

globalThis.FileReader = class FileReader {
  result = null;
  onloadend = null;
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((result) => {
      this.result = result;
      this.onloadend?.();
    });
  }
};

const scene = new THREE.Scene();
const concrete = new THREE.MeshStandardMaterial({ color: 0xdedbd3, roughness: 0.82 });
const charcoal = new THREE.MeshStandardMaterial({ color: 0x2d302f, roughness: 0.7 });
const timber = new THREE.MeshStandardMaterial({ color: 0x8a5f3d, roughness: 0.62 });
const glass = new THREE.MeshStandardMaterial({ color: 0x8da5a3, roughness: 0.12, metalness: 0.08 });

function box(name, size, position, material) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material);
  mesh.name = name;
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  scene.add(mesh);
}

box("GroundFloor", [8, 0.45, 5.6], [0, 0.2, 0], concrete);
box("LivingRoom", [4.8, 2.9, 4.6], [-1.25, 1.85, 0], concrete);
box("UpperFloor", [3.4, 2.45, 4.6], [1.55, 4.45, 0], concrete);
box("Cantilever", [4.5, 0.34, 5.1], [1.0, 5.83, 0], charcoal);
box("Garage", [2.35, 2.35, 4.7], [3.15, 1.55, 0], charcoal);
box("TimberFrame", [0.3, 2.2, 4.9], [-3.55, 2.05, 0], timber);
box("WindowWall", [0.12, 2.0, 3.3], [-3.72, 2.05, 0], glass);
box("UpperWindow", [0.12, 1.75, 3.4], [-0.18, 4.55, 0], glass);
box("Pool", [5.8, 0.12, 2.2], [-0.7, 0.08, 4.0], glass);

await mkdir("public/models", { recursive: true });
const exporter = new GLTFExporter();
const arrayBuffer = await new Promise((resolve, reject) => {
  exporter.parse(scene, resolve, reject, { binary: true, onlyVisible: true });
});
await writeFile("public/models/demo-house.glb", Buffer.from(arrayBuffer));
console.log("Created public/models/demo-house.glb");
