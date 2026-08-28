import type { Floor } from "../types/property";

type FloorSelectorProps = {
  floors: Floor[];
  selectedFloorId: string | null;
  onSelectFloor: (floorId: string | null) => void;
};

export function FloorSelector({ floors, selectedFloorId, onSelectFloor }: FloorSelectorProps) {
  if (floors.length < 2) return null;

  return (
    <nav className="floor-selector" aria-label="Floors">
      <span>Floors</span>
      <div>
        <button type="button" onClick={() => onSelectFloor(null)} aria-pressed={!selectedFloorId}>
          Whole house
        </button>
        {[...floors]
          .sort((a, b) => b.order - a.order)
          .map((floor) => (
            <button
              key={floor.id}
              type="button"
              onClick={() => onSelectFloor(floor.id === selectedFloorId ? null : floor.id)}
              aria-pressed={floor.id === selectedFloorId}
            >
              {floor.name}
            </button>
          ))}
      </div>
    </nav>
  );
}
