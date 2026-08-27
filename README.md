# HomeView

A browser-based 3D property explorer.

Buyers open a link and move through a home before ever visiting it — orbiting the exterior,
selecting a room to glide the camera inside, inspecting how the spaces connect. Agents and
developers publish a property by supplying a model and its configuration: floors, rooms,
camera views and hotspots.

The engine holds no property-specific logic. A villa, an apartment and a duplex all render
through identical code — only the data differs.

## What is here

A marketing site at `/` introducing the product, and the explorer at `/explore/[propertyId]`.
`/explore/demo-house` is live and statically generated.

The explorer loads a property, renders its GLB, and gives you orbit and zoom with lighting,
shadows, a loading state, error handling and a WebGL fallback. Selecting a room reads that
room's camera from the property data and animates both the camera and the orbit target to it
with GSAP.

Property data currently comes from a local repository. Firebase has deliberately not been
introduced yet.

## Stack

Next.js, React, TypeScript and Tailwind CSS. Three.js and React Three Fiber with drei for
rendering, GSAP for camera transitions, Zustand for explorer state. Models are authored in
Blender and served as compressed GLB.

Rendering happens entirely in the browser — no app, no headset.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000, or go straight to
[/explore/demo-house](http://localhost:3000/explore/demo-house).

```bash
npm run lint
npx next build --webpack   # webpack, not turbopack
npm start
```

## Layout

```
app/                    routes; thin, resolving data and rendering a feature screen
components/             shared UI — brand, layout, form controls
features/explorer/      the 3D explorer: components, hooks, screens, types, utils
features/marketing/     marketing-page behavior
```

Feature code lives under its feature and is separated by responsibility; anything shared
across features moves up to `components/`. Changing where properties come from means changing
`features/explorer/utils/propertyRepository.ts` and nothing else.
