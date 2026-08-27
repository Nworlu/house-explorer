"use client";

import { useProgress } from "@react-three/drei";

export function ExplorerLoading() {
  const { active, progress } = useProgress();
  if (!active) return null;
  return (
    <div className="viewer-loading" role="status" aria-live="polite">
      <div className="loading-plan" aria-hidden="true"><i /><i /><i /></div>
      <p>Preparing the spatial model</p>
      <strong>{Math.round(progress).toString().padStart(2, "0")}%</strong>
      <span><b style={{ transform: `scaleX(${progress / 100})` }} /></span>
    </div>
  );
}
