# Ardjuna — Dota 2 Coaching

A dark, editorial website for Ardjuna's Dota 2 coaching and academy.

## Stack

- React + TypeScript + Vite
- React Router
- SCSS Modules

## Development

```bash
npm install
npm run dev
```

Use `npm run build` to create a production build.

## Deployment

Push the `main` branch to `alyonabel/dota2`. The included GitHub Actions workflow
builds the app and deploys it to GitHub Pages. Client-side routes use URL hashes so
they also work when the site is hosted under the `/dota2/` project path.
