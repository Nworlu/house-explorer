# Extractable components

## CreationProgress

- Source: `features/property-creation/components/CreationProgress.tsx`
- Category: layout
- Description: Four-step progress rail for the studio creation flow.
- Extractable props: `current`.

## FormField

- Source: `components/forms/FormField.tsx`
- Category: basic
- Description: Labeled single-line or multiline field.
- Extractable props: label, hint, and native input props.

## Camera preview panel

- Source: child of `PropertyReviewEditor.tsx`
- Category: basic
- Description: Live exterior framing preview with positional camera controls.
- Extractable props: position, target, modelUrl, and onPositionChange.
