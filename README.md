# ross-portfolio

Editorial photography portfolio. Astro 5 + Tailwind v4 + PhotoSwipe, deployed to Cloudflare Pages.

## Run it

```bash
# Once, on your machine:
corepack enable           # gives you pnpm with no separate install
pnpm install
pnpm dev                  # http://localhost:4321
```

Prefer npm? `npm install && npm run dev` works the same.

## Add a gallery

1. Create a folder under `src/content/galleries/<slug>/` and an `images/` subfolder inside it.
2. Drop in your original-resolution photos (jpg / png). Astro + Sharp will generate AVIF/WebP variants at build.
3. Create `index.md` in that folder. See `src/content/galleries/iceland-2025/index.md` for the schema.
4. `pnpm dev` to preview, then commit and push — Cloudflare Pages auto-deploys.

## Deploy

Push to GitHub, then in Cloudflare dashboard:

- Workers & Pages → Create → Pages → Connect to Git
- Build command: `pnpm build` · Output dir: `dist` · Node version env: `NODE_VERSION=22`

Live at `<your-project>.pages.dev` in about a minute.

## Project layout

```
src/
  components/        Reusable .astro components (Nav, Footer, GalleryCard, PhotoFigure)
  content/galleries/ One folder per gallery, each with index.md + images/
  layouts/Base.astro Site shell
  pages/             Routes
  styles/global.css  Tailwind v4 theme tokens
public/
  _headers           Cloudflare security headers
  robots.txt
functions/api/       Cloudflare Pages Functions (contact form lives here)
```
