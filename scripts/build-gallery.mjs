// ---------------------------------------------------------------------------
// build-gallery.mjs
//
// Scans the "name - country - type" folders in the project root, reads each
// photo's capture date (EXIF first, then the date embedded in the filename,
// then the file's modified time), sorts newest-first, and writes web-optimised
// copies (large + thumbnail) into public/gallery/<slug>/. Finally it writes a
// manifest to src/data/projects.json that the Astro pages render from, and
// copies the CV PDF into public/cv/.
//
// Run with:   npm run gallery         (skips images already generated)
//             npm run gallery:force   (regenerates every image)
// ---------------------------------------------------------------------------

import { readdir, mkdir, stat, writeFile, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import exifr from 'exifr';
import { gallery as cfg } from '../src/config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'gallery');
const DATA_DIR = path.join(ROOT, 'src', 'data');
const FORCE = process.argv.includes('--force');

const IMAGE_RE = /\.(jpe?g|png)$/i;
// Folders that are part of the site, not photo projects.
const IGNORE = new Set([
  'node_modules', 'public', 'src', 'scripts', 'dist', '.astro', '.git', '.github',
]);

function slugify(s) {
  return s
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // strip accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// "Name - Country - Type" -> parts. Type may be missing (2-part folders).
// A trailing roman numeral (e.g. "paper mill II") is only there to keep two
// same-named folders distinct; strip it from the displayed type.
function parseFolderName(name) {
  const parts = name.split(' - ').map((p) => p.trim());
  return {
    factory: parts[0] || name,
    country: parts[1] || '',
    type: (parts.slice(2).join(' - ') || '').replace(/\s+I{1,3}$/, '').trim(),
  };
}

// Pull a date from filenames like IMG_20190830_094221 or 2019-08-30_...
function dateFromFilename(file) {
  const m = file.match(/(\d{4})[-_]?(\d{2})[-_]?(\d{2})[-_ ]?(\d{2})?(\d{2})?(\d{2})?/);
  if (!m) return null;
  const [, y, mo, d, h = '00', mi = '00', s = '00'] = m;
  const dt = new Date(Number(y), Number(mo) - 1, Number(d), Number(h), Number(mi), Number(s));
  const year = dt.getFullYear();
  if (Number.isNaN(dt.getTime()) || year < 1990 || year > 2100) return null;
  return dt;
}

async function captureDate(filePath, file) {
  try {
    const ex = await exifr.parse(filePath, ['DateTimeOriginal', 'CreateDate', 'ModifyDate']);
    const d = ex?.DateTimeOriginal || ex?.CreateDate || ex?.ModifyDate;
    if (d instanceof Date && !Number.isNaN(d.getTime())) return d;
  } catch {
    /* no/br0ken EXIF — fall through */
  }
  const fromName = dateFromFilename(file);
  if (fromName) return fromName;
  return (await stat(filePath)).mtime;
}

async function processImage(srcPath, outDir, index) {
  const base = String(index + 1).padStart(3, '0');
  const largeName = `${base}.jpg`;
  const thumbName = `${base}_thumb.jpg`;
  const largePath = path.join(outDir, largeName);
  const thumbPath = path.join(outDir, thumbName);

  let info;
  if (!FORCE && existsSync(largePath) && existsSync(thumbPath)) {
    info = await sharp(largePath).metadata();
  } else {
    // .rotate() bakes in EXIF orientation so phone photos aren't sideways.
    info = await sharp(srcPath)
      .rotate()
      .resize({ width: cfg.largeSize, height: cfg.largeSize, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: cfg.largeQuality, mozjpeg: true })
      .toFile(largePath);
    await sharp(srcPath)
      .rotate()
      .resize({ width: cfg.thumbSize, height: cfg.thumbSize, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: cfg.thumbQuality, mozjpeg: true })
      .toFile(thumbPath);
  }
  return { large: largeName, thumb: thumbName, w: info.width, h: info.height };
}

async function main() {
  const entries = await readdir(ROOT, { withFileTypes: true });
  const projectDirs = [];
  for (const e of entries) {
    if (!e.isDirectory() || IGNORE.has(e.name) || e.name.startsWith('.')) continue;
    const files = (await readdir(path.join(ROOT, e.name))).filter((f) => IMAGE_RE.test(f));
    if (files.length) projectDirs.push({ name: e.name, files });
  }

  const projects = [];
  for (const dir of projectDirs) {
    const slug = slugify(dir.name);
    const outDir = path.join(OUT_DIR, slug);
    await mkdir(outDir, { recursive: true });

    // date each image, sort newest-first
    const dated = [];
    for (const file of dir.files) {
      const srcPath = path.join(ROOT, dir.name, file);
      dated.push({ file, srcPath, date: await captureDate(srcPath, file) });
    }
    dated.sort((a, b) => b.date - a.date);

    const images = [];
    for (let i = 0; i < dated.length; i++) {
      const out = await processImage(dated[i].srcPath, outDir, i);
      images.push({ ...out, date: dated[i].date.toISOString() });
      process.stdout.write(`\r  ${slug}: ${i + 1}/${dated.length}   `);
    }
    process.stdout.write('\n');

    const meta = parseFolderName(dir.name);
    const newest = dated[0]?.date ?? new Date(0);
    const oldest = dated[dated.length - 1]?.date ?? newest;
    projects.push({
      slug,
      folder: dir.name,
      ...meta,
      count: images.length,
      newest: newest.toISOString(),
      yearFrom: oldest.getFullYear(),
      yearTo: newest.getFullYear(),
      cover: `gallery/${slug}/${images[0].thumb}`,
      images: images.map((im) => ({
        full: `gallery/${slug}/${im.large}`,
        thumb: `gallery/${slug}/${im.thumb}`,
        w: im.w,
        h: im.h,
        date: im.date,
      })),
    });
    console.log(`✓ ${meta.factory} — ${meta.country}${meta.type ? ' — ' + meta.type : ''} (${images.length})`);
  }

  // newest projects first
  projects.sort((a, b) => new Date(b.newest) - new Date(a.newest));

  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(path.join(DATA_DIR, 'projects.json'), JSON.stringify(projects, null, 2));
  console.log(`\nWrote src/data/projects.json — ${projects.length} projects, ${projects.reduce((n, p) => n + p.count, 0)} photos.`);

  // Optimise the hero portrait into /public/me.jpg
  if (cfg.portraitSourcePath && existsSync(cfg.portraitSourcePath)) {
    let pipe = sharp(cfg.portraitSourcePath).rotate();
    if (cfg.flipPortrait) pipe = pipe.flop(); // horizontal mirror -> un-mirror selfie
    await pipe
      .resize({ width: cfg.portraitSize, height: cfg.portraitSize, fit: 'cover', position: 'attention' })
      .jpeg({ quality: cfg.portraitQuality, mozjpeg: true })
      .toFile(path.join(ROOT, 'public', 'me.jpg'));
    console.log('Wrote hero portrait -> public/me.jpg');
  } else {
    console.warn('! Portrait source not found — set gallery.portraitSourcePath in src/config.js (hero photo will be missing until then)');
  }

  // Copy the CV into /public/cv/
  if (cfg.cvSourcePath && existsSync(cfg.cvSourcePath)) {
    const cvOut = path.join(ROOT, 'public', 'cv');
    await mkdir(cvOut, { recursive: true });
    await copyFile(cfg.cvSourcePath, path.join(cvOut, 'Zdenek_Otcenasek_CV.pdf'));
    console.log('Copied CV -> public/cv/Zdenek_Otcenasek_CV.pdf');
  } else {
    console.warn('! CV source not found — update gallery.cvSourcePath in src/config.js');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
