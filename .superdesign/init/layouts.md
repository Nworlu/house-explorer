# Shared layouts

## Studio shell
The property studio uses a compact white header over a soft off-white workspace. Property creation flows use a four-step progress rail and coral primary actions.

`features/property-creation/screens/PropertyCreationScreen.tsx` owns the studio creation shell, route header, progress navigation, and step content.

```tsx
<main className="creation-shell">
  <header className="creation-header"><Link href="/"><Brand /></Link><span>Property model studio</span><Link href="/">Saved locally · Exit</Link></header>
  <CreationProgress current={flow.step} />
  {/* details, capture, preflight, review */}
</main>
```
