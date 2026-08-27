import { mkdir, writeFile } from "node:fs/promises";
import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";

globalThis.FileReader = class FileReader { result = null; onloadend = null; readAsArrayBuffer(blob) { blob.arrayBuffer().then((result) => { this.result = result; this.onloadend?.(); }); } };

const scene = new THREE.Scene();
const mat = (color, roughness = .72, metalness = 0) => new THREE.MeshStandardMaterial({ color, roughness, metalness });
const concrete = mat(0xd9d5cc, .86), plaster = mat(0xf2efe8, .92), charcoal = mat(0x252a29, .62), timber = mat(0x805334, .66);
const oak = mat(0xb58d62, .72), fabric = mat(0x7d8782, .98), cream = mat(0xe4ded2, .96), stone = mat(0xaaa59b, .78), green = mat(0x466156, .88), water = mat(0x76a2a1, .12, .08);
const glass = new THREE.MeshStandardMaterial({ color: 0x91b3b2, roughness: .08, metalness: .03, transparent: true, opacity: .56 });

function box(name, size, position, finish, rotationY = 0) { const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), finish); mesh.name = name; mesh.position.set(...position); mesh.rotation.y = rotationY; mesh.castShadow = true; mesh.receiveShadow = true; scene.add(mesh); return mesh; }
function cylinder(name, radius, depth, position, finish, rotation = [0, 0, 0]) { const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, depth, 24), finish); mesh.name = name; mesh.position.set(...position); mesh.rotation.set(...rotation); mesh.castShadow = true; mesh.receiveShadow = true; scene.add(mesh); return mesh; }
function windowPanel(name, width, height, position) { box(`Exterior${name}Glass`, [width, height, .07], position, glass); for (const [suffix, x] of [["L", position[0] - width / 2], ["R", position[0] + width / 2]]) box(`Exterior${name}Frame${suffix}`, [.08, height + .12, .12], [x, position[1], position[2] + .02], charcoal); box(`Exterior${name}FrameTop`, [width, .08, .12], [position[0], position[1] + height / 2, position[2] + .02], charcoal); box(`Exterior${name}FrameBottom`, [width, .08, .12], [position[0], position[1] - height / 2, position[2] + .02], charcoal); }
function bed(prefix, position, width = 2) { box(`${prefix}Base`, [width, .34, 1.85], position, charcoal); box(`${prefix}Mattress`, [width - .12, .26, 1.72], [position[0], position[1] + .3, position[2]], cream); box(`${prefix}Headboard`, [width + .12, .9, .14], [position[0], position[1] + .67, position[2] - .82], green); }
function wardrobe(prefix, position, width = 1.5) { box(`${prefix}Wardrobe`, [width, 2.05, .5], position, oak); box(`${prefix}WardrobeLine`, [.04, 1.9, .54], [position[0], position[1], position[2] + .02], charcoal); }

// Courtyard-house shell, 12m × 8m. Exterior-prefixed meshes are toggled as one façade state.
box("GroundFloor", [12, .28, 8], [0, .14, 0], concrete);
box("UpperFloorLeft", [4.4, .24, 8], [-3.8, 3.18, 0], concrete); box("UpperFloorRight", [4.4, .24, 8], [3.8, 3.18, 0], concrete); box("UpperFloorBridge", [3.2, .24, 2.2], [0, 3.18, -2.9], concrete);
box("RoofLeft", [4.7, .26, 8.3], [-3.75, 6.28, 0], charcoal); box("RoofRight", [4.7, .26, 8.3], [3.75, 6.28, 0], charcoal); box("RoofBridge", [3.2, .26, 2.4], [0, 6.28, -2.8], charcoal);
box("BackWallGround", [12, 2.9, .2], [0, 1.72, -3.9], plaster); box("BackWallUpper", [12, 2.85, .2], [0, 4.7, -3.9], plaster); box("LeftWall", [.2, 5.95, 8], [-5.9, 3.12, 0], plaster); box("RightWall", [.2, 5.95, 8], [5.9, 3.12, 0], plaster);

// Complete exterior front: solid piers, large glazing, upper timber fins, and entrance canopy.
box("ExteriorGroundPierLeft", [1.25, 2.9, .24], [-5.27, 1.72, 3.9], concrete); box("ExteriorGroundPierMidL", [.5, 2.9, .24], [-1.55, 1.72, 3.9], concrete); box("ExteriorGroundPierMidR", [.5, 2.9, .24], [1.55, 1.72, 3.9], concrete); box("ExteriorGroundPierRight", [1.25, 2.9, .24], [5.27, 1.72, 3.9], concrete);
windowPanel("GroundLiving", 3.15, 2.45, [-3.4, 1.72, 4.02]); windowPanel("GroundCourtyard", 2.55, 2.45, [0, 1.72, 4.02]); windowPanel("GroundKitchen", 3.15, 2.45, [3.4, 1.72, 4.02]);
box("ExteriorUpperPierLeft", [1.35, 2.85, .24], [-5.22, 4.7, 3.9], concrete); box("ExteriorUpperPierCenter", [.55, 2.85, .24], [0, 4.7, 3.9], concrete); box("ExteriorUpperPierRight", [1.35, 2.85, .24], [5.22, 4.7, 3.9], concrete);
windowPanel("UpperLeft", 4.15, 2.35, [-2.65, 4.7, 4.02]); windowPanel("UpperRight", 4.15, 2.35, [2.65, 4.7, 4.02]);
for (let fin = 0; fin < 8; fin += 1) box(`ExteriorTimberFin${fin}`, [.09, 2.5, .38], [1.15 + fin * .35, 4.68, 4.18], timber);
box("ExteriorEntranceCanopy", [3.15, .18, 1.4], [0, 3.0, 4.4], charcoal); box("ExteriorFrontStep", [4.2, .18, .85], [0, .08, 4.28], stone);

// Central open-air courtyard, visible from both floors.
box("CourtyardStone", [3.0, .06, 3.05], [0, .32, .25], stone); box("CourtyardGarden", [1.15, .1, 1.4], [0, .37, .15], green); box("CourtyardWater", [1.0, .08, 2.45], [1.0, .38, .15], water); cylinder("CourtyardTree", .12, 2.1, [-.55, 1.35, .05], timber); cylinder("CourtyardCanopy", .75, .55, [-.55, 2.45, .05], green);
box("CourtyardGlassLeft", [.08, 2.55, 3.15], [-1.58, 1.68, .25], glass); box("CourtyardGlassRight", [.08, 2.55, 3.15], [1.58, 1.68, .25], glass); box("CourtyardGlassBack", [3.15, 2.55, .08], [0, 1.68, -1.3], glass);

// Ground floor: living room, kitchen/dining, guest bedroom, bathroom, stairs.
box("LivingRug", [3.25, .04, 2.4], [-3.85, .34, 1.25], cream); box("LivingSofaBase", [2.6, .42, .9], [-3.85, .62, .8], fabric); box("LivingSofaBack", [2.6, .72, .22], [-3.85, 1.0, .4], fabric); box("LivingCoffeeTable", [1.35, .16, .75], [-3.85, .52, 1.9], oak); box("LivingMediaUnit", [2.2, .4, .34], [-3.85, .55, -1.1], charcoal); box("LivingTelevision", [1.7, .95, .07], [-3.85, 1.5, -1.25], charcoal);
box("KitchenBackCounter", [3.25, .88, .62], [3.95, .78, -3.48], charcoal); box("KitchenCabinets", [3.25, .72, .42], [3.95, 2.02, -3.63], oak); box("KitchenIsland", [2.25, .9, 1.0], [3.8, .78, -.8], stone); box("KitchenIslandTop", [2.4, .1, 1.15], [3.8, 1.28, -.8], cream); box("DiningTable", [2.0, .16, 1.0], [3.8, .95, 1.9], timber);
[[-.7, 1.35], [.7, 1.35], [-.7, 2.45], [.7, 2.45]].forEach(([x, z], i) => box(`DiningChair${i}`, [.48, .68, .48], [3.8 + x, .65, z], green));
box("GuestRoomPartition", [3.8, 2.8, .16], [-4.0, 1.7, -1.55], plaster); bed("GuestBedroom", [-4.0, .58, -2.65], 1.8); wardrobe("GuestBedroom", [-5.35, 1.45, -2.6], 1.0);
box("GroundBathPartition", [2.35, 2.8, .16], [2.75, 1.7, -2.0], plaster); box("GroundBathroomVanity", [1.0, .76, .45], [2.15, .72, -3.55], stone); box("GroundBathroomMirror", [.88, .85, .05], [2.15, 1.65, -3.76], glass); cylinder("GroundBathroomToilet", .3, .56, [3.6, .62, -3.35], cream, [Math.PI / 2, 0, 0]);
for (let step = 0; step < 12; step += 1) box(`Stair${step + 1}`, [.95, .16, .4], [1.9, .4 + step * .235, 2.7 - step * .29], timber);

// Upper floor: primary suite plus bedrooms two and three, matching four bedrooms total.
box("UpperLeftPartition", [.16, 2.8, 5.4], [-1.55, 4.7, -.7], plaster); box("UpperRightPartition", [.16, 2.8, 5.4], [1.55, 4.7, -.7], plaster); box("UpperRearPartition", [7.4, 2.8, .16], [2.2, 4.7, -1.65], plaster);
bed("PrimaryBedroom", [-3.85, 3.65, -.4], 2.25); wardrobe("PrimaryBedroom", [-5.3, 4.45, -2.85], 1.0); box("PrimaryBench", [1.5, .38, .45], [-3.85, 3.55, 1.2], fabric);
bed("BedroomTwo", [0, 3.62, -2.65], 1.75); wardrobe("BedroomTwo", [-1.0, 4.42, -3.45], .8);
bed("BedroomThree", [3.85, 3.62, .2], 1.8); wardrobe("BedroomThree", [5.3, 4.42, -2.65], .9); box("BedroomThreeDesk", [1.25, .12, .5], [4.55, 4.0, 2.65], oak);
box("UpperBathroomPartitionLeft", [1.0, 2.8, .16], [1.95, 4.7, -1.65], plaster); box("UpperBathroomPartitionRight", [.65, 2.8, .16], [5.55, 4.7, -1.65], plaster); box("UpperBathroomVanity", [1.35, .78, .46], [2.35, 3.72, -3.5], stone); box("UpperBathroomMirror", [1.2, .9, .05], [2.35, 4.7, -3.77], glass); box("UpperBathroomTub", [1.75, .58, .8], [4.55, 3.55, -3.25], cream);
box("UpperCourtyardRailingLeft", [2.1, .72, .08], [-2.6, 3.58, 1.58], glass); box("UpperCourtyardRailingRight", [2.1, .72, .08], [2.6, 3.58, 1.58], glass);

// Exterior landscape reinforces the courtyard-villa silhouette.
box("Pool", [7.2, .12, 2.1], [-1.4, .03, 5.75], water); box("PoolDeck", [12, .14, 1.1], [0, .04, 4.65], stone);
for (const [i, x] of [-5.2, -4.5, 4.6, 5.3].entries()) { cylinder(`ExteriorLandscapeTrunk${i}`, .08, 1.2, [x, .65, 5.1], timber); cylinder(`ExteriorLandscapePlant${i}`, .34, .65, [x, 1.35, 5.1], green); }

await mkdir("public/models", { recursive: true });
const exporter = new GLTFExporter();
const arrayBuffer = await new Promise((resolve, reject) => exporter.parse(scene, resolve, reject, { binary: true, onlyVisible: true }));
await writeFile("public/models/courtyard-house-demo-v3.glb", Buffer.from(arrayBuffer));
console.log("Created detailed four-bedroom courtyard demo");
