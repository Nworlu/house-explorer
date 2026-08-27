import type { Property } from "../types/property";

export const demoHouse: Property = {
  id: "demo-house", slug: "demo-house", name: "Courtyard House", location: "Lekki, Lagos",
  description: "A fictional four-bedroom courtyard residence with a complete exterior and room-by-room cutaway views.",
  modelUrl: "/models/courtyard-house-demo-v3.glb", area: 286, bedrooms: 4,
  floors: [
    { id: "ground-floor", name: "Ground floor", order: 0, meshNames: ["GroundFloor", "LivingSofaBase", "KitchenIsland", "GuestBedroomBase", "GroundBathroomVanity"] },
    { id: "upper-floor", name: "Upper floor", order: 1, meshNames: ["UpperFloorLeft", "UpperFloorRight", "PrimaryBedroomBase", "BedroomTwoBase", "BedroomThreeBase", "UpperBathroomVanity"] },
  ],
  rooms: [
    { id: "living-room", name: "Living room", floorId: "ground-floor", area: 42, camera: { position: [-3.8, 1.8, 7.1], target: [-3.8, 1.15, 0.6] } },
    { id: "kitchen", name: "Kitchen & dining", floorId: "ground-floor", area: 31, camera: { position: [4.0, 1.85, 7.0], target: [3.8, 1.1, -0.4] } },
    { id: "guest-bedroom", name: "Guest bedroom", floorId: "ground-floor", area: 18, camera: { position: [-4.0, 2.3, -1.65], target: [-4.0, .85, -2.85] } },
    { id: "ground-bathroom", name: "Ground bathroom", floorId: "ground-floor", area: 7, camera: { position: [3.0, 2.3, -2.0], target: [3.0, .8, -3.45] } },
    { id: "primary-suite", name: "Primary suite", floorId: "upper-floor", area: 31, camera: { position: [-3.8, 4.85, 7.0], target: [-3.8, 4.0, -.2] } },
    { id: "bedroom-two", name: "Bedroom two", floorId: "upper-floor", area: 17, camera: { position: [0, 5.35, -1.7], target: [0, 3.9, -2.9] } },
    { id: "bedroom-three", name: "Bedroom three", floorId: "upper-floor", area: 18, camera: { position: [3.8, 4.85, 7.0], target: [3.8, 4.0, .2] } },
    { id: "upper-bathroom", name: "Upper bathroom", floorId: "upper-floor", area: 11, camera: { position: [4.0, 5.4, -1.7], target: [3.5, 3.9, -3.35] } },
  ],
  hotspots: [],
  cameraPresets: [{ id: "exterior-front", name: "Exterior overview", camera: { position: [15, 8.8, 17], target: [0, 2.7, .4] } }],
};
