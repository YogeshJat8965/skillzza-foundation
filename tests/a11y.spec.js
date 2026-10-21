import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

for (const viewport of [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  test(`no WCAG 2.2 AA violations (${viewport.name})`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.addInitScript(() => sessionStorage.setItem('skz-intro-seen', '1'));
    await page.goto('/', { waitUntil: 'networkidle' });
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
    const summary = results.violations.map(
      (v) => `${v.id} (${v.impact}): ${v.help}\n  ${v.nodes.slice(0, 4).map((n) => n.target.join(' ')).join('\n  ')}`,
    );
    expect(summary, summary.join('\n\n')).toEqual([]);
  });
}
