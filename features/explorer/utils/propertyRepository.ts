import type { Property } from "../types/property";
import { demoHouse } from "./demoProperty";

const properties: Record<string, Property> = { [demoHouse.id]: demoHouse, [demoHouse.slug]: demoHouse };
export const propertyIds = [...new Set(Object.values(properties).map((property) => property.id))];

export async function getProperty(propertyId: string): Promise<Property | null> {
  return properties[propertyId] ?? null;
}
