import { mkdir, writeFile } from "node:fs/promises";
import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

globalThis.FileReader = class FileReader { result = null; onloadend = null; readAsArrayBuffer(blob) { blob.arrayBuffer().then((result) => { this.result = result; this.onloadend?.(); }); } };

const scene = new THREE.Scene();
const material = (color, roughness = 0.72, metalness = 0) => new THREE.MeshStandardMaterial({ color, roughness, metalness });
const concrete = material(0xd8d3c9, 0.86), wall = material(0xf1eee7, 0.9), charcoal = material(0x252a28, 0.68);
const timber = material(0x895b38, 0.62), oak = material(0xb68d61, 0.7), fabric = material(0x8c948f, 0.96);
const cream = material(0xded8cb, 0.95), stone = material(0xb7b0a5, 0.78), green = material(0x49645b, 0.86), water = material(0x85aaa9, 0.14, 0.05);
const glass = new THREE.MeshStandardMaterial({ color: 0xa9c3c0, roughness: 0.08, metalness: 0.04, transparent: true, opacity: 0.5 });

function box(name, size, position, finish) { const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), finish); mesh.name = name; mesh.position.set(...position); mesh.castShadow = true; mesh.receiveShadow = true; scene.add(mesh); return mesh; }
function cylinder(name, radius, depth, position, finish, rotation = [0, 0, 0]) { const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, depth, 24), finish); mesh.name = name; mesh.position.set(...position); mesh.rotation.set(...rotation); mesh.castShadow = true; mesh.receiveShadow = true; scene.add(mesh); return mesh; }

// Open-front shell makes the fictional interior visible from every room camera.
box("GroundFloor", [9, .3, 6.2], [0, .15, 0], concrete); box("UpperFloor", [9, .24, 6.2], [0, 3.12, 0], concrete); box("Roof", [9.4, .28, 6.5], [0, 6.12, 0], charcoal);
box("GroundBackWall", [9, 2.85, .2], [0, 1.68, -3], wall); box("UpperBackWall", [9, 2.75, .2], [0, 4.58, -3], wall); box("LeftWall", [.2, 5.82, 6.2], [-4.4, 3.05, 0], wall); box("RightWall", [.2, 5.82, 6.2], [4.4, 3.05, 0], wall);
box("KitchenPartition", [.16, 2.8, 3], [1.55, 1.65, -1.45], wall); box("GuestBathPartition", [2.75, 2.8, .16], [3, 1.65, -1.25], wall); box("LivingTimberScreen", [.12, 2.45, 1.8], [-4.25, 1.55, 1.5], timber);

// Living room.
box("LivingSofaBase", [2.65, .42, .92], [-2.25, .62, .45], fabric); box("LivingSofaBack", [2.65, .75, .24], [-2.25, 1, .02], fabric); box("LivingSofaArmL", [.22, .55, .92], [-3.48, .85, .45], fabric); box("LivingSofaArmR", [.22, .55, .92], [-1.02, .85, .45], fabric);
box("LivingCoffeeTable", [1.5, .18, .85], [-2.2, .48, 1.75], oak); box("LivingMediaUnit", [2.2, .45, .35], [-2.1, .55, -2.72], charcoal); box("LivingTelevision", [1.65, .92, .08], [-2.1, 1.55, -2.84], charcoal); box("LivingRug", [3.6, .04, 2.5], [-2.1, .34, 1.05], cream);

// Dining and kitchen.
box("DiningTable", [2.1, .16, 1.05], [.1, .98, -1.75], timber);
[[-.72, -1.18], [.72, -1.18], [-.72, -2.32], [.72, -2.32]].forEach(([x, z], index) => box(`DiningChair${index}`, [.52, .72, .52], [.1 + x, .66, z], green));
box("KitchenBackCounter", [2.55, .88, .62], [2.9, .76, -2.6], charcoal); box("KitchenUpperCabinet", [2.55, .72, .42], [2.9, 2, -2.72], oak); box("KitchenIsland", [2, .9, .92], [2.75, .78, .2], stone); box("KitchenIslandTop", [2.14, .1, 1.04], [2.75, 1.27, .2], cream);

// Guest bathroom and staircase.
box("GuestBathVanity", [1, .78, .45], [2.15, .72, -2.62], oak); box("GuestBathMirror", [.88, .82, .06], [2.15, 1.62, -2.87], glass); cylinder("GuestBathToilet", .34, .58, [3.7, .62, -2.45], cream, [Math.PI / 2, 0, 0]);
for (let step = 0; step < 11; step += 1) box(`Stair${step + 1}`, [1, .17, .42], [.75, .38 + step * .245, 1.9 - step * .32], timber);

// Upper floor rooms.
box("UpperRoomPartition", [.16, 2.7, 4], [.65, 4.56, -.95], wall); box("UpperBathPartition", [3.65, 2.7, .16], [2.5, 4.56, -1.35], wall);
box("PrimaryBedBase", [2.4, .42, 2.05], [-2.05, 3.55, -.55], charcoal); box("PrimaryMattress", [2.25, .3, 1.9], [-2.05, 3.92, -.55], cream); box("PrimaryHeadboard", [2.55, 1.15, .18], [-2.05, 4.42, -1.45], timber); box("PrimaryBench", [1.6, .42, .48], [-2.05, 3.55, 1.12], fabric); box("PrimaryWardrobe", [1.55, 2.1, .52], [-3.42, 4.24, -2.52], oak);
box("BedroomBedBase", [1.75, .38, 1.95], [2, 3.52, .3], charcoal); box("BedroomMattress", [1.64, .28, 1.82], [2, 3.85, .3], cream); box("BedroomHeadboard", [1.82, .9, .16], [2, 4.3, -.55], green); box("BedroomDesk", [1.3, .12, .55], [3.45, 4, 1.55], oak);
box("UpperBathVanity", [1.3, .8, .48], [1.55, 3.72, -2.55], stone); box("UpperBathMirror", [1.15, .9, .06], [1.55, 4.7, -2.87], glass); box("UpperBathTub", [1.75, .62, .82], [3.35, 3.58, -2.25], cream);

box("UpperGlassRailing", [8.2, .7, .08], [0, 3.52, 2.96], glass); box("Pool", [6.2, .12, 2.1], [-.7, .04, 4.25], water); box("PoolDeck", [9, .14, 1], [0, .05, 3.15], stone);

await mkdir("public/models", { recursive: true });
const exporter = new GLTFExporter();
const arrayBuffer = await new Promise((resolve, reject) => exporter.parse(scene, resolve, reject, { binary: true, onlyVisible: true }));
await writeFile("public/models/demo-house.glb", Buffer.from(arrayBuffer));
console.log("Created interior-ready public/models/demo-house.glb");
