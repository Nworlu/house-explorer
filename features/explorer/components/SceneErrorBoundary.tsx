"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { failed: boolean };

export class SceneErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };
  static getDerivedStateFromError(): State { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error("3D scene failed", error, info); }
  render() {
    if (this.state.failed) {
      return (
        <div className="scene-error" role="alert">
          <span>Model unavailable</span><h2>The 3D file could not be opened.</h2>
          <p>The property details are still available. Reload to try the model again.</p>
          <button className="button button-primary" onClick={() => window.location.reload()}>Reload model</button>
        </div>
      );
    }
    return this.props.children;
  }
}
