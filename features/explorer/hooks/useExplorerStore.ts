import { create } from "zustand";

type ExplorerState = {
  selectedRoomId: string | null;
  selectedFloorId: string | null;
  viewMode: "orbit" | "room";
  setSelectedRoom: (roomId: string | null) => void;
  setSelectedFloor: (floorId: string | null) => void;
  resetView: () => void;
};

export const useExplorerStore = create<ExplorerState>((set) => ({
  selectedRoomId: null,
  selectedFloorId: null,
  viewMode: "orbit",
  // Choosing a room implies its floor; the caller passes the owning floor id.
  setSelectedRoom: (selectedRoomId) => set({ selectedRoomId, viewMode: selectedRoomId ? "room" : "orbit" }),
  setSelectedFloor: (selectedFloorId) => set({ selectedFloorId, selectedRoomId: null, viewMode: "orbit" }),
  resetView: () => set({ selectedRoomId: null, selectedFloorId: null, viewMode: "orbit" }),
}));
