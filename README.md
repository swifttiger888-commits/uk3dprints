# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Deployment

### Prerequisites

- Cloudflare account with Pages enabled
- Custom domain (`uk3dprints.com`) connected to the Pages project

### Production deployment

```bash
npm run deploy
```

This builds the SPA, prerenders product pages into `dist/product/<slug>/index.html`, and deploys to Cloudflare Pages.

**Important:** The first time you deploy, or if you switch environments, ensure the deploy is associated with the branch configured as **production** in your Cloudflare Pages project settings (Dashboard → Pages → `uk3dprints` → Settings → Build configuration → Production branch). By default this is often `main` or `master`.

If you need to target a specific branch, append `--branch=<name>`:

```bash
wrangler pages deploy dist/ --project-name=uk3dprints --branch=main
```

Deployments tied to the production branch are served automatically on the custom domain. Deployments from other branches create preview URLs only — promote them via the Cloudflare Dashboard if needed.

### URL format

All canonical URLs, sitemap entries, OG tags, and JSON-LD schemas use trailing-slash paths (`/product/steering-wheel/`) to match the format Cloudflare Pages serves for directory index files.
