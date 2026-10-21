// The page must show the client's words exactly - nothing changed, nothing missing, nothing added.
import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from '@playwright/test';
import { navigation, contactCta } from '../src/data/navigation.js';

const root = path.resolve(import.meta.dirname, '..');
const normalise = (s) => s.replace(/\s+/g, ' ').trim();

// Photo notes are art direction, not copy. Mission 2030 targets are shown without their brackets.
const UNBRACKETED = new Set(['[1 Crore]', '[10 Lakh]', '[5 Lakh]', '[1 Lakh]']);
const contentLines = fs
  .readFileSync(path.join(root, 'content.txt'), 'utf8')
  .split('\n')
  .map(normalise)
  .filter((line) => line && !/^\[(Hero photo|Photo)/.test(line))
  .map((line) => (UNBRACKETED.has(line) ? line.slice(1, -1) : line));

const navStrings = navigation.flatMap((item) => [
  item.label,
  item.title,
  item.description,
  item.cta.label,
  ...item.groups.flatMap((g) => [g.label, ...g.links.map((l) => l.label)]),
]);
navStrings.push(contactCta.label);

// Invisible accessibility text approved by the client (only the skip link can become visible, on focus).
const APPROVED_EXTRAS = ['Skip to content'];

test.use({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('skz-intro-seen', '1'));
  await page.goto('/', { waitUntil: 'networkidle' });
  // Compare the words as written: uppercase eyebrows are a CSS style, not a change to the copy.
  await page.addStyleTag({ content: '* { text-transform: none !important; }' });
});

test('every line of content.txt appears verbatim', async ({ page }) => {
  // Read the page the way a screen reader does: decorative copies (rolling digits, marquee repeats) drop out.
  await page.addStyleTag({ content: '[aria-hidden="true"] { display: none !important; }' });
  const placeholders = await page.$$eval('[placeholder]', (els) => els.map((el) => el.getAttribute('placeholder')));
  const text = normalise([await page.locator('body').innerText(), ...placeholders].join(' '));
  const missing = contentLines.filter((line) => !text.includes(line));
  expect(missing, `Missing from page:\n${missing.join('\n')}`).toEqual([]);
});

test('every navigation menu shows its screenshot text verbatim', async ({ page }) => {
  for (const item of navigation) {
    await page.getByRole('button', { name: item.label, exact: true }).click();
    const panel = page.locator(`#mega-${item.id}`);
    await expect(panel).toBeVisible();
    const text = normalise(await panel.innerText());
    const expected = [item.title, item.description, item.cta.label, ...item.groups.flatMap((g) => [g.label, ...g.links.map((l) => l.label)])];
    const missing = expected.filter((s) => !text.includes(s));
    expect(missing, `${item.label} menu is missing:\n${missing.join('\n')}`).toEqual([]);
    await page.keyboard.press('Escape');
  }
});

test('no visible text exists that is not in the content', async ({ page }) => {
  const corpus = normalise([...contentLines, ...navStrings, ...APPROVED_EXTRAS].join(' \n '));
  const fragments = await page.evaluate(() => {
    const out = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const text = node.textContent.replace(/\s+/g, ' ').trim();
      const el = node.parentElement;
      if (!text || !el || el.closest('script, style, noscript')) continue;
      if (!el.checkVisibility({ checkVisibilityCSS: true })) continue;
      out.push(text);
    }
    return out;
  });
  const extra = [...new Set(fragments)].filter((t) => !corpus.includes(t));
  expect(extra, `Text on the page that is not in the content:\n${extra.join('\n')}`).toEqual([]);
});
