# Zdeněk Otčenášek — Portfolio site

A fast, static portfolio built with [Astro](https://astro.build) and hosted on
GitHub Pages. Each `Factory - Country - Type` folder becomes a project page with
a photo gallery. Photos are sorted **newest-first** and served as
web-optimised copies (the heavy originals stay on your computer).

## How it works

```
work_portfolio/
├─ Carlsberg - Denmark - brewery/     ← your ORIGINAL photo folders (git-ignored)
├─ Mondi - Czech Republic - paper mill/
├─ …
├─ scripts/build-gallery.mjs          ← resizes photos + builds the manifest
├─ src/                               ← the website (pages, layout, styles)
│  ├─ config.js                       ← ALL contact details & links live here
│  └─ data/projects.json             ← generated list of projects (do not edit)
└─ public/
   ├─ gallery/<project>/…             ← generated web images (committed)
   └─ cv/Zdenek_Otcenasek_CV.pdf     ← copied from your Drive (committed)
```

Folder names are parsed as `Factory - Country - Type`. A 2-part name
(e.g. `Keller Lufttechnik - Italy`) simply has no "type" badge.

## Adding a new project (the everyday workflow)

1. Drop a new folder of photos into the project root, named
   `Factory - Country - Type`.
2. Run:
   ```bash
   npm run gallery
   ```
   This resizes the new photos, dates them (EXIF → filename → file time),
   sorts newest-first, and updates `src/data/projects.json`.
3. Commit and push:
   ```bash
   git add .
   git commit -m "Add <factory> project"
   git push
   ```
   GitHub builds and publishes the site automatically.

`npm run gallery` skips photos it has already generated, so re-runs are fast.
Use `npm run gallery:force` to rebuild every image (e.g. after changing sizes).

## First-time setup

```bash
npm install          # install Astro, sharp, exifr
npm run gallery      # resize all photos + copy the CV
npm run dev          # preview locally at http://localhost:4321
```

### Before your first deploy

1. Create a GitHub repo and push this folder to it.
2. Open **`astro.config.mjs`** and set `SITE` and `BASE` to match your repo
   (instructions are in the file — the repo name goes in `BASE`).
3. On GitHub: **Settings → Pages → Build and deployment → Source = GitHub Actions**.
4. Push to `main`. The site deploys to `https://<username>.github.io/<repo>/`.

## Editing your details

All personal info — phone, email, LinkedIn, CV path, the certificates Drive
link, and image sizes/quality — is in **`src/config.js`**. Nothing else needs
touching.
