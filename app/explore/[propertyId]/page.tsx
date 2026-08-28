import { PropertyRouteScreen } from "@/features/explorer/screens/PropertyRouteScreen";
import { propertyIds } from "@/features/explorer/utils/propertyRepository";

export function generateStaticParams() { return propertyIds.map((propertyId) => ({ propertyId })); }

export default async function PropertyExplorerPage({ params }: PageProps<"/explore/[propertyId]">) {
  const { propertyId } = await params;
  return <PropertyRouteScreen propertyId={propertyId} />;
}
