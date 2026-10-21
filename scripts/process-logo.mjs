// Turns the white-background logo PNG into transparent web variants: the logo exactly as
// supplied (tagline included) and a dark-background version for the footer and mobile menu.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const SRC = path.join(root, 'Skillzza Foundation Uplift Logo.png');
const OUT = path.join(root, 'src/assets/brand');
await fs.mkdir(OUT, { recursive: true });

const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width;
const H = info.height;
const N = W * H;

const minc = new Uint8Array(N);
for (let i = 0; i < N; i++) minc[i] = Math.min(data[i * 3], data[i * 3 + 1], data[i * 3 + 2]);

// Separable min/max filter over a (2r+1)² window.
function filter(src, r, pick) {
  const tmp = new Uint8Array(N);
  const out = new Uint8Array(N);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let v = src[y * W + x];
      for (let k = Math.max(0, x - r); k <= Math.min(W - 1, x + r); k++) v = pick(v, src[y * W + k]);
      tmp[y * W + x] = v;
    }
  }
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      let v = tmp[y * W + x];
      for (let k = Math.max(0, y - r); k <= Math.min(H - 1, y + r); k++) v = pick(v, tmp[k * W + x]);
      out[y * W + x] = v;
    }
  }
  return out;
}

const BG = 248;
const isBg = new Uint8Array(N);
for (let i = 0; i < N; i++) isBg[i] = minc[i] >= 244 ? 255 : 0;
const localMin = filter(minc, 3, Math.min);
const nearBg = filter(isBg, 3, Math.max);

// Edge pixels are a blend of the ink colour and white: recover alpha from how far the
// pixel sits between the two, then un-blend the colour. Interior pixels stay opaque so
// two-tone petal folds never turn semi-transparent.
const rgba = Buffer.alloc(N * 4);
for (let i = 0; i < N; i++) {
  let a;
  if (isBg[i] || localMin[i] >= 215) a = 0;
  else if (nearBg[i]) a = Math.min(1, Math.max(0, (BG - minc[i]) / (BG - localMin[i])));
  else a = 1;
  if (a < 0.03) a = 0;
  for (let c = 0; c < 3; c++) {
    const p = data[i * 3 + c];
    rgba[i * 4 + c] = a ? Math.min(255, Math.max(0, Math.round((p - (1 - a) * 255) / a))) : 0;
  }
  rgba[i * 4 + 3] = Math.round(a * 255);
}

// Dark-background variant: navy wordmark → white, grey tagline and rules → light slate.
const dark = Buffer.from(rgba);
for (let i = 0; i < N; i++) {
  if (!dark[i * 4 + 3]) continue;
  const r = dark[i * 4];
  const g = dark[i * 4 + 1];
  const b = dark[i * 4 + 2];
  const navy = b > r + 25 && r < 90 && g < 100 && b < 160;
  const grey = Math.abs(r - g) < 18 && Math.abs(g - b) < 22 && r > 60 && r < 205;
  if (navy) dark.set([255, 255, 255], i * 4);
  else if (grey) dark.set([184, 194, 214], i * 4);
}

function bbox() {
  let x0 = W, y0 = H, x1 = 0, y1 = 0;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (rgba[(y * W + x) * 4 + 3] > 8) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
    }
  }
  const pad = 6;
  const left = Math.max(0, x0 - pad);
  const top = Math.max(0, y0 - pad);
  return { left, top, width: Math.min(W, x1 + pad) - left, height: Math.min(H, y1 + pad) - top };
}

// One WebP per width for srcset, plus a PNG at the largest width (OG image, docs).
async function emit(buf, box, name, widths) {
  const crop = () => sharp(buf, { raw: { width: W, height: H, channels: 4 } }).extract(box);
  for (const width of widths) {
    await crop().resize({ width }).webp({ quality: 90, alphaQuality: 100 }).toFile(path.join(OUT, `${name}-${width}.webp`));
  }
  await crop().resize({ width: widths.at(-1) }).png({ compressionLevel: 9 }).toFile(path.join(OUT, `${name}.png`));
}

for (const file of await fs.readdir(OUT)) await fs.rm(path.join(OUT, file));
const full = bbox();
await emit(rgba, full, 'logo-full', [400, 800, 1200]);
await emit(dark, full, 'logo-full-dark', [400, 560, 1000]);

console.log(`logo ${full.width}x${full.height}`);
