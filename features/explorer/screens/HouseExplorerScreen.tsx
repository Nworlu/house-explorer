"use client";

import Link from "next/link";
import { useEffect } from "react";
import type { Property } from "../types/property";
import { useExplorerStore } from "../hooks/useExplorerStore";
import { ExplorerLoading } from "../components/ExplorerLoading";
import { ExplorerScene } from "../components/ExplorerScene";
import { SceneErrorBoundary } from "../components/SceneErrorBoundary";

export function HouseExplorerScreen({ property }: { property: Property }) {
  const initialCamera = property.cameraPresets[0]?.camera ?? { position: [10, 6, 10], target: [0, 2, 0] };
  const selectedRoomId = useExplorerStore((state) => state.selectedRoomId);
  const setSelectedRoom = useExplorerStore((state) => state.setSelectedRoom);
  const resetView = useExplorerStore((state) => state.resetView);
  const selectedRoom = property.rooms.find((room) => room.id === selectedRoomId);
  const activeCamera = selectedRoom?.camera ?? initialCamera;

  useEffect(() => { resetView(); }, [property.id, resetView]);

  return (
    <main className="viewer-shell">
      <header className="viewer-header">
        <Link href="/" className="brand viewer-brand"><span className="brand-mark">HV</span><span><strong>HomeView</strong><small>Property explorer</small></span></Link>
        <div className="viewer-title"><span>Now viewing</span><strong>{property.name}</strong></div>
        <Link href="/" className="close-viewer" aria-label="Close explorer">Close <span aria-hidden="true">×</span></Link>
      </header>
      <section className="viewer-stage" aria-label={`3D view of ${property.name}`}>
        <SceneErrorBoundary><ExplorerScene modelUrl={property.modelUrl} initialCamera={initialCamera} activeCamera={activeCamera} cutaway={Boolean(selectedRoom)} /></SceneErrorBoundary>
        <ExplorerLoading />
        <aside className={`property-panel${selectedRoom ? " property-panel-room" : ""}`}>
          <span className="panel-index">Residence 01</span>
          <p className="location">{property.location}</p><h1>{property.name}</h1><p>{property.description}</p>
          <dl><div><dt>Interior</dt><dd>{property.area} m²</dd></div><div><dt>Bedrooms</dt><dd>{property.bedrooms}</dd></div><div><dt>Levels</dt><dd>{property.floors.length}</dd></div></dl>
        </aside>
        <nav className="room-navigator" aria-label="Property views"><span>Choose a view</span><div><button onClick={resetView} aria-pressed={!selectedRoomId}>Exterior</button>{property.rooms.map((room) => <button key={room.id} onClick={() => setSelectedRoom(room.id)} aria-pressed={room.id === selectedRoomId}>{room.name}</button>)}</div><small>{selectedRoom ? `${selectedRoom.name}${selectedRoom.area ? ` · ${selectedRoom.area} m²` : ""}` : "Drag to orbit · scroll to zoom"}</small></nav>
        <div className="gesture-help" aria-label="Viewer controls"><span>Drag to orbit</span><i /><span>Scroll to zoom</span></div>
        <div className="model-status" aria-live="polite"><i /> Model connected</div>
      </section>
    </main>
  );
}
