# Casual Chic Home

Design source for the Casual Chic Home storefront — sister brand to [Casual Chic Boutique](https://casualchicboutique.com), built on shared Medusa with a separate sales channel.

## What this repo is

A **Figma Make** export — React + Vite SPA, mock data, no backend. It is the visual/UX source of truth for the storefront. The production storefront will be built into the `casualchic` monorepo at `stores/casual-chic-home/apps/storefront/`, replicating the deployment pattern of `stores/casual-chic-boutique/apps/storefront/` (TanStack Start + Medusa SDK + Cloudflare Workers + Railway tunnel).

Original Figma file: <https://www.figma.com/design/HkCi5qCJCXBY6Q4vpgdTJg/Casual-Chic-Home>.

## Run locally

```bash
npm install
npm run dev          # vite, http://localhost:5173
npm run typecheck
npm run build
```

## Repo layout

```text
src/
├── main.tsx                        # entry
├── app/
│   ├── App.tsx                     # state-routed page switch
│   ├── store.tsx                   # in-memory cart/wishlist/route
│   ├── data.ts                     # 10 mock products
│   ├── articles.ts                 # 4 editorial articles
│   └── components/
│       ├── header.tsx, hero.tsx, category-tiles.tsx, ...
│       └── figma/ImageWithFallback.tsx
└── styles/
    ├── theme.css                   # design tokens (colors, type)
    └── tailwind.css, fonts.css, index.css
```

See [CATALOG.md](CATALOG.md) for the seed catalog spec the Medusa sales channel will be populated from.

## Production storefront — status

Not deployed yet. Launch targets:

- **Domain:** `casualchichome.com` (also `home.casualchicboutique.com`)
- **Backend:** shared Medusa on Railway, new sales channel `casual-chic-home`
- **Auth:** shared Keycloak realm with CCB
- **Deploy:** Cloudflare Workers (SSR)
