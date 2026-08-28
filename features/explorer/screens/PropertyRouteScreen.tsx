"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Property } from "../types/property";
import { demoHouse } from "../utils/demoProperty";
import { loadGeneratedProperty } from "@/features/property-creation/utils/localCreationRepository";
import { HouseExplorerScreen } from "./HouseExplorerScreen";

export function PropertyRouteScreen({ propertyId }: { propertyId: string }) {
  const [property, setProperty] = useState<Property | null | undefined>(undefined);
  useEffect(() => { Promise.resolve().then(() => setProperty(propertyId === demoHouse.id || propertyId === demoHouse.slug ? demoHouse : loadGeneratedProperty(propertyId))); }, [propertyId]);
  if (property === undefined) return <main className="route-loading"><span>Loading property</span></main>;
  if (!property) return <main className="not-found"><span>Property unavailable</span><h1>This local property was not found on this device.</h1><p>Generated previews live in this browser until Firebase persistence is connected.</p><Link className="button button-primary" href="/studio/new">Create a property</Link></main>;
  return <HouseExplorerScreen property={property} />;
}
