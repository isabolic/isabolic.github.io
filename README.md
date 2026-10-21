# isabolic.dev

Personal portfolio: a career rendered as a topographic map.

- **Hero**: live contour lines (marching squares over an animated height field) that rise under the cursor
- **Strata**: stack layers over time; click a layer to filter the route, like toggling layers in a GIS client
- **Route**: career waypoints from the first GIS job to today
- **Terminal**: press <kbd>`</kbd> (try `help`, `ls`, `sudo hire ivan`)

All content lives in `src/data/cv.ts`.

```sh
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Deploy

Every push to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.
One-time setup: repo **Settings → Pages → Source: GitHub Actions**.
For a custom domain, set it under Settings → Pages; the build picks up the right base path automatically.
