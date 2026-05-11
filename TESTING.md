# Test checklist

Two passes. Pass 1 proves the codebase actually builds; Pass 2 proves it looks and feels right.

## Pass 1 — Production build

```powershell
pnpm build
```

Watch for:
- All six routes emit (`/`, `/galleries`, `/galleries/iceland-2025`, `/about`, `/contact`, `/404`)
- "✓ Completed" at the end, no red error
- A `dist/` folder appears in the project

If it succeeds, also preview the built output:

```powershell
pnpm preview
```

Browse the preview URL — should look identical to dev mode but faster.

## Pass 2 — Visual walkthrough (in dev or preview)

Open each page and check:

### Home (`/`)
- [ ] "Photography" eyebrow + giant "Ross" serif headline
- [ ] Intro paragraph below
- [ ] "Recent work" grid with the Iceland cover (placeholder gradient with "01 · cover" text)
- [ ] Hovering the card slightly scales the image
- [ ] Clicking the card jumps to `/galleries/iceland-2025`

### Galleries index (`/galleries`)
- [ ] "Selected work" eyebrow + "Galleries" headline
- [ ] Same Iceland card visible
- [ ] Card shows year (2025) and location (Iceland) on the right

### Gallery detail (`/galleries/iceland-2025`)
- [ ] Header with "2025 · Iceland", title, body paragraph
- [ ] Four photo placeholders stacked vertically with captions below each
- [ ] **Click any photo** → fullscreen PhotoSwipe lightbox opens, dim background
- [ ] Lightbox supports left/right arrow keys, Esc to close, click outside to close
- [ ] Footer nav: "← All galleries" and "Inquire about prints →"

### About (`/about`)
- [ ] Two-column layout (sidebar + body) on desktop
- [ ] Empty headshot box on left, dl with "Based in / Working since / Email"
- [ ] Body paragraphs + "Selected exhibitions" + "Selected publications" lists

### Contact (`/contact`)
- [ ] Form with Name, Email, Message fields (underline-style inputs)
- [ ] "Send" button on dark background
- [ ] Sidebar with direct email + Instagram/Are.na links
- [ ] (Form won't actually submit yet — needs Cloudflare Function + Turnstile setup after deploy)

### 404 (`/this-page-does-not-exist`)
- [ ] Big "Lost the trail." headline
- [ ] Links back to galleries and home

### Cross-page checks
- [ ] Top nav sticks to top while scrolling, slightly transparent background
- [ ] Footer at the bottom of every page with copyright year
- [ ] Hitting Tab from page load shows a "Skip to content" link
- [ ] Browser dev tools console — no red errors on any page

### Responsive (Chrome dev tools or just resize the window)
- [ ] Below ~768px (mobile): grid collapses to single column, headlines shrink, nav stays usable
- [ ] At 768–1024px (tablet): two-column grid kicks in
- [ ] Above 1280px: comfortable margins, images stay large

## What to paste back

For Pass 1: the full `pnpm build` log.

For Pass 2: anything that's broken, looks wrong, or doesn't match the checklist. Screenshots help if the issue is visual.

Once both passes are clean, next stop is Cloudflare Pages — a 5-minute click-through to get the site live at `<your-project>.pages.dev`.
