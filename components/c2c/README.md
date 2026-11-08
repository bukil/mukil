# C2C product page

Route: `/c2c`. The Playground C2C card links to this page.

## Replace the temporary cube study

1. Put the finished GLB in `public/models/`.
2. Set `C2C_MODEL_URL` in `config.mjs`, for example `/models/c2c.glb`.
3. The scene centers and fits the entire model automatically. Export Y-up with the product's front facing +Z. The existing scroll sequence will rotate and scale the loaded model.

Until a URL is configured, the scene uses a procedural product study, not the final C2C model. It renders on demand and respects reduced motion. No missing-model request is made. A failed GLB request leaves the study visible.

The GLB should contain one C2C unit. It is centered, fitted, and duplicated into two identical, equally scaled copies. Both copies share the scroll rotation, glass finish, and symmetric separation animation.

## Glass finish

Cube enclosures share Daksha's `refractive-glass.mjs` shader: Snell refraction,
RGB dispersion, surface waviness, Fresnel reflections, and the same optical settings.
C2C captures its own live headings and stage background into the refraction scene.
Displays and buttons retain their readable finishes.

The finish is also applied when a GLB is loaded. Meshes named screen, display, OLED,
button, switch, label, LED, or encoder preserve their authored materials. Set mesh
metadata `c2cGlass: true` or `false` to explicitly include or exclude a mesh.

## Sources

- Layout, type measurements, and motion reference: https://www.nexplayground.com/?utm_source=lenis
- Display font: BD Karlo, from the reference's public `/fonts/BD-Karlo/BD-Karlo-normal.woff2` endpoint.
- Body font: Be Vietnam Pro, Google Fonts (400, 500, 600, 700), stored locally.
- Project facts and extracted process photos: `public/C2C_Interaction Design_Report.pdf`, especially pages 1, 5–8.
- Existing prototype render and demo: `public/images/works/c2cf.png`, `public/6502.mp4`.

C2C content replaces the reference's commercial product claims, catalogue, and customer testimonials. No Nex product imagery or 3D model is included.

## Scroll stories

The main portfolio navigation surrounds the centered C2C mark. The footer contains
only C2C. With motion enabled and at least 650px of viewport height, the interaction
carousel, process steps, and image gallery each use a sticky stage and a bounded
scroll runway. The carousel reaches its fourth card before releasing to the process.
The process cards enter sequentially; the gallery uses a slower reversible drift.
Section dots track the active chapter, including the image gallery.

Reduced motion and shorter viewports use the natural reading layout; the carousel
retains horizontal scrolling and previous/next buttons in that layout.

## Final presentation

The centered C2C mark sits within the usual transparent portfolio navigation.
The full-width prototype video loads as it enters view, plays muted on a loop with
no controls or overlay buttons, and pauses offscreen or when the tab is hidden.
Its intrinsic aspect ratio is preserved so the complete frame remains visible.
The process CTA, internal watch/demo buttons, and professor credits are omitted.
