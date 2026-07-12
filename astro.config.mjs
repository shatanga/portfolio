import { defineConfig } from 'astro/config';

// ---------------------------------------------------------------------------
// GitHub Pages configuration
//
// There are two hosting cases. Pick the one that matches your repo:
//
// 1) User/organisation site  -> repo named  <username>.github.io
//    site: 'https://<username>.github.io'
//    base: '/'
//
// 2) Project site (most common) -> any other repo name, e.g. "portfolio"
//    site: 'https://<username>.github.io'
//    base: '/portfolio/'      <-- must match the repo name, with slashes
//
// The values below assume case (2) with repo name "portfolio".
// Edit SITE and BASE, then commit. That's the only place URLs are configured.
// ---------------------------------------------------------------------------
const SITE = 'https://shatanga.github.io';
const BASE = '/portfolio/';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  build: {
    // keep asset URLs stable and clean
    assets: '_assets',
  },
});
