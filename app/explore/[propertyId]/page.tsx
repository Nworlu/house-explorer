import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HouseExplorerScreen } from "@/features/explorer/screens/HouseExplorerScreen";
import { getProperty, propertyIds } from "@/features/explorer/utils/propertyRepository";

export function generateStaticParams() { return propertyIds.map((propertyId) => ({ propertyId })); }

export async function generateMetadata({ params }: PageProps<"/explore/[propertyId]">): Promise<Metadata> {
  const { propertyId } = await params;
  const property = await getProperty(propertyId);
  return { title: property?.name ?? "Property not found", description: property?.description };
}

export default async function PropertyExplorerPage({ params }: PageProps<"/explore/[propertyId]">) {
  const { propertyId } = await params;
  const property = await getProperty(propertyId);
  if (!property) notFound();
  return <HouseExplorerScreen property={property} />;
}
