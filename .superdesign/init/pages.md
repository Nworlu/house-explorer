# Page dependency trees

## /studio/new
Entry: `app/studio/new/page.tsx`

- `features/property-creation/screens/PropertyCreationScreen.tsx`
  - `components/brand/Brand.tsx`
  - `components/forms/FormField.tsx`
  - `features/property-creation/components/CaptureCard.tsx`
  - `features/property-creation/components/CreationProgress.tsx`
  - `features/property-creation/components/ProcessingPipeline.tsx`
  - `features/property-creation/components/PropertyReviewEditor.tsx`
  - `features/property-creation/hooks/usePropertyCreation.ts`
  - `app/globals.css`

## /explore/[propertyId]
Entry: `app/explore/[propertyId]/page.tsx`

- `features/explorer/screens/PropertyRouteScreen.tsx`
  - `features/explorer/screens/HouseExplorerScreen.tsx`
    - `features/explorer/components/ExplorerScene.tsx`
    - `features/explorer/components/CameraController.tsx`
    - `features/explorer/components/PropertyModel.tsx`
*** Add File: /Users/jehoshaphategbe/Work/mobile-app-experiments/house-explorer/.superdesign/init/extractable-components.md
# Extractable components

## CreationProgress
- Source: `features/property-creation/components/CreationProgress.tsx`
- Category: layout
- Description: Four-step progress rail for the studio creation flow.
- Extractable props: `current`.
- Hardcoded: property, capture, coverage, review labels.

## FormField
- Source: `components/forms/FormField.tsx`
- Category: basic
- Description: Labeled single-line or multiline field.
- Extractable props: label, hint, native input props.
- Hardcoded: class names and label structure.

## Camera preview panel
- Source: new child of `PropertyReviewEditor.tsx`
- Category: basic
- Description: Live exterior framing preview with positional camera controls.
- Extractable props: position, target, modelUrl, onPositionChange.
- Hardcoded: studio preview label and interaction affordances.
