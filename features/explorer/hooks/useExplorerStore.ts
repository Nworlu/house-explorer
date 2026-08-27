import { create } from "zustand";

type ExplorerState = {
  selectedRoomId: string | null;
  viewMode: "orbit" | "room";
  setSelectedRoom: (roomId: string | null) => void;
  resetView: () => void;
};

export const useExplorerStore = create<ExplorerState>((set) => ({
  selectedRoomId: null,
  viewMode: "orbit",
  setSelectedRoom: (selectedRoomId) => set({ selectedRoomId, viewMode: selectedRoomId ? "room" : "orbit" }),
  resetView: () => set({ selectedRoomId: null, viewMode: "orbit" }),
}));
