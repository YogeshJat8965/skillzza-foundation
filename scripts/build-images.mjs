// Builds responsive AVIF/WebP sets, blur-up placeholders, the image manifest and
// CREDITS.md from scripts/photos.json. Run with --force to re-encode everything.
import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const srcDir = path.join(root, 'assets-src/photos');
const outDir = path.join(root, 'public/images');
const manifestPath = path.join(root, 'src/data/images.generated.json');
const WIDTHS = [480, 800, 1200, 1600];
const force = process.argv.includes('--force');

const photos = JSON.parse(await fs.readFile(path.join(root, 'scripts/photos.json'), 'utf8'));
await fs.mkdir(srcDir, { recursive: true });
await fs.mkdir(outDir, { recursive: true });

async function ensureSource({ key, pexelsId }) {
  const file = path.join(srcDir, `${key}.jpg`);
  if (existsSync(file)) return file;
  const url = `https://images.pexels.com/photos/${pexelsId}/pexels-photo-${pexelsId}.jpeg?auto=compress&cs=tinysrgb&w=2400`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed for ${key}: HTTP ${res.status}`);
  await fs.writeFile(file, Buffer.from(await res.arrayBuffer()));
  return file;
}

// One shared grade so photos from different photographers read as a single, warm set.
const graded = (file) =>
  sharp(file)
    .rotate()
    .modulate({ saturation: 1.06, brightness: 1.01 })
    .linear([1.03, 1, 0.96], [-1, 0, 3]);

async function write(pipeline, name, srcStat) {
  const target = path.join(outDir, name);
  if (!force && existsSync(target)) {
    const outStat = await fs.stat(target);
    if (outStat.mtimeMs >= srcStat.mtimeMs) return;
  }
  await pipeline.toFile(target);
}

const manifest = {};
for (const photo of photos) {
  const file = await ensureSource(photo);
  const srcStat = await fs.stat(file);
  const meta = await sharp(file).metadata();
  const rotated = (meta.orientation ?? 1) >= 5;
  const width = rotated ? meta.height : meta.width;
  const height = rotated ? meta.width : meta.height;
  const widths = WIDTHS.filter((w) => w <= width);

  await Promise.all(
    widths.flatMap((w) => [
      write(graded(file).resize({ width: w }).avif({ quality: 52, effort: 4 }), `${photo.key}-${w}.avif`, srcStat),
      write(graded(file).resize({ width: w }).webp({ quality: 74 }), `${photo.key}-${w}.webp`, srcStat),
    ]),
  );

  const lqip = await graded(file).resize({ width: 24 }).webp({ quality: 40 }).toBuffer();
  manifest[photo.key] = {
    width,
    height,
    widths,
    alt: photo.alt,
    focus: photo.focus,
    lqip: `data:image/webp;base64,${lqip.toString('base64')}`,
  };
  console.log(`✓ ${photo.key} (${widths.join(', ')})`);
}

await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

const credits = [
  '# Photo credits',
  '',
  'All photographs are from [Pexels](https://www.pexels.com) and used under the [Pexels License](https://www.pexels.com/license/) (free to use and modify, no attribution required). Each link below opens the original photo and its photographer.',
  '',
  '| Used as | Pexels photo |',
  '|---|---|',
  ...photos.map((p) => `| \`${p.key}\` | [${p.pexelsId}](${p.page}) |`),
  '',
  'These are stand-ins until Skillzza Foundation’s own programme photos are available - swap them by replacing entries in `scripts/photos.json` and running `npm run images`.',
  '',
];
await fs.writeFile(path.join(root, 'CREDITS.md'), credits.join('\n'));
console.log(`\nManifest: ${photos.length} photos → ${path.relative(root, manifestPath)}`);
