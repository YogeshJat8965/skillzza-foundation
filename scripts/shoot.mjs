// Visual QA: screenshots of every section (and the menus) at a given viewport.
// Usage: node scripts/shoot.mjs <outDir> [width] [height] [browser] [url]
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium, firefox, webkit } from '@playwright/test';

const [outDir, width = '1440', height = '900', browserName = 'chromium', url = 'http://127.0.0.1:5173/'] = process.argv.slice(2);
const W = Number(width);
const H = Number(height);
const engines = { chromium, firefox, webkit };
await fs.mkdir(outDir, { recursive: true });

const browser = await engines[browserName].launch();
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
const errors = [];
page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
page.on('pageerror', (err) => errors.push(String(err)));

const shot = (name) => page.screenshot({ path: path.join(outDir, `${String(++shot.n).padStart(2, '0')}-${name}.png`) });
shot.n = 0;

await page.goto(url, { waitUntil: 'networkidle' });
await page.waitForTimeout(3600);
await shot('hero');

if (W >= 1024) {
  for (const label of ['About Us', 'Programmes', 'Labs', 'Scholarships', 'Impact', 'Get Involved']) {
    await page.getByRole('button', { name: label, exact: true }).hover();
    await page.waitForTimeout(900);
    await shot(`menu-${label.toLowerCase().replace(/\s+/g, '-')}`);
  }
  await page.mouse.move(W / 2, H - 10);
  await page.waitForTimeout(500);
} else {
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.waitForTimeout(1200);
  await shot('mobile-menu');
  await page.getByRole('button', { name: 'Programmes', exact: true }).click();
  await page.waitForTimeout(800);
  await shot('mobile-menu-open');
  await page.getByRole('button', { name: 'Close menu' }).click();
  await page.waitForTimeout(900);
}

// Walk down the page in viewport-sized steps with the wheel so Lenis and ScrollTrigger behave as for a person.
let y = -1;
let step = 0;
for (;;) {
  await page.mouse.wheel(0, Math.round(H * 0.85));
  await page.waitForTimeout(1400);
  const next = await page.evaluate(() => window.scrollY);
  if (next === y || step > 60) break;
  y = next;
  await shot(`scroll-${String(++step).padStart(2, '0')}`);
}

await fs.writeFile(path.join(outDir, 'errors.txt'), errors.join('\n') || 'no console errors');
console.log(`${shot.n} screenshots, ${errors.length} console errors → ${outDir}`);
await browser.close();
