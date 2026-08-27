import type { Property } from "../types/property";

export const demoHouse: Property = {
  id: "demo-house", slug: "demo-house", name: "Courtyard House", location: "Lekki, Lagos",
  description: "A fictional two-level demo with a cutaway interior, open living spaces, and furnished room views.",
  modelUrl: "/models/demo-house.glb", area: 286, bedrooms: 4,
  floors: [
    { id: "ground-floor", name: "Ground floor", order: 0, meshNames: ["GroundFloor", "LivingSofaBase", "KitchenIsland", "GuestBathVanity"] },
    { id: "upper-floor", name: "Upper floor", order: 1, meshNames: ["UpperFloor", "PrimaryBedBase", "BedroomBedBase", "UpperBathVanity"] },
  ],
  rooms: [
    { id: "living-room", name: "Living room", floorId: "ground-floor", area: 42, camera: { position: [-2.8, 1.8, 6.8], target: [-2.1, 1.15, 0.2] } },
    { id: "kitchen", name: "Kitchen", floorId: "ground-floor", area: 24, camera: { position: [3.5, 1.75, 6.3], target: [2.7, 1.1, -0.6] } },
    { id: "guest-bathroom", name: "Guest bathroom", floorId: "ground-floor", area: 7, camera: { position: [3.7, 1.65, 3.9], target: [3.05, 1.05, -2.25] } },
    { id: "primary-suite", name: "Primary suite", floorId: "upper-floor", area: 31, camera: { position: [-2.7, 4.75, 6.5], target: [-2.0, 4.05, -0.2] } },
    { id: "upper-bathroom", name: "Upper bathroom", floorId: "upper-floor", area: 11, camera: { position: [3.5, 4.7, 4.6], target: [2.65, 4.15, -2.2] } },
  ],
  hotspots: [],
  cameraPresets: [{ id: "exterior-front", name: "Cutaway overview", camera: { position: [11.5, 7.4, 13.5], target: [0, 2.7, 0] } }],
};
