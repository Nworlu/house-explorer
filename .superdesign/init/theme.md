# Theme

## Token summary

- Workspace: `#f7f7f3`; surface: `#ffffff`; ink: `#172321`; deep green: `#123f3c`; coral action: `#ef5b54`; muted text: `#68716e`; border: `#d9dfdc`.
- Display type: `var(--font-display)` serif. Interface type: `var(--font-sans)`.
- Radius: 9px for controls, 12–18px for studio surfaces.
- Breakpoints: 800px and 560px.
- Motion: 140–300ms ease-out; no decorative animation in creation forms.

## Existing studio review selectors

```css
.review-editor{padding:30px;background:white;border:1px solid #d9dfdc;border-radius:16px}
.review-room-list>div{display:grid;grid-template-columns:1fr 150px;gap:12px;padding:10px 0;border-bottom:1px solid #e1e6e4}
.review-editor fieldset{margin:25px 0 0;padding:18px;border:1px solid #d2d9d6;display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.creation-primary{min-height:50px;padding:0 20px;border:0;border-radius:9px;background:#ef5b54;color:white;font:800 11px/1 var(--font-sans),sans-serif}
```
