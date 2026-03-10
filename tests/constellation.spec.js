const { test, expect } = require('@playwright/test');

test.describe('Constellation Landing Page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for staggered animations to finish
    await page.waitForTimeout(2500);
  });

  test('page loads and center element is visible', async ({ page }) => {
    const center = page.locator('#center');
    await expect(center).toBeVisible();

    const photo = page.locator('#center-photo');
    await expect(photo).toBeVisible();
    await expect(photo).toHaveText('A');

    const name = page.locator('#center-name');
    await expect(name).toBeVisible();
    await expect(name).toHaveText('Andrew');

    const tagline = page.locator('#center-tagline');
    await expect(tagline).toBeVisible();
  });

  test('all 4 nodes are visible after animation', async ({ page }) => {
    for (const id of ['#node-projects', '#node-blog', '#node-contact', '#node-social']) {
      const node = page.locator(id);
      await expect(node).toBeVisible();
    }
  });

  test('tooltip appears on hover for Projects', async ({ page }) => {
    const node = page.locator('#node-projects');
    const tooltip = node.locator('.tooltip');

    // Tooltip should be hidden initially
    await expect(tooltip).toHaveCSS('opacity', '0');

    // Hover the node
    await node.hover();
    await page.waitForTimeout(400);

    // Tooltip should become visible
    await expect(tooltip).toHaveCSS('opacity', '1');
  });

  test('connector line glows on node hover', async ({ page }) => {
    const node = page.locator('#node-projects');
    const line = page.locator('#line-projects');

    // Hover the node
    await node.hover();
    await page.waitForTimeout(400);

    // Line should have glow class
    await expect(line).toHaveClass(/glow-pink/);

    // Move away
    await page.locator('#center').hover();
    await page.waitForTimeout(400);

    // Glow class should be removed
    await expect(line).not.toHaveClass(/glow-pink/);
  });

  test('Projects node expands and collapses on click', async ({ page }) => {
    const node = page.locator('#node-projects');
    const subLinks = node.locator('.sub-links');

    // Initially not expanded
    await expect(node).not.toHaveClass(/expanded/);
    await expect(subLinks).toHaveCSS('max-height', '0px');

    // Click to expand
    await node.click();
    await expect(node).toHaveClass(/expanded/);

    // Sub-links should be visible
    await page.waitForTimeout(500);
    const links = subLinks.locator('a');
    await expect(links).toHaveCount(3);

    // Click to collapse
    await node.click();
    await expect(node).not.toHaveClass(/expanded/);
  });

  test('Social node expands and collapses on click', async ({ page }) => {
    const node = page.locator('#node-social');
    const subLinks = node.locator('.sub-links');

    // Initially not expanded
    await expect(node).not.toHaveClass(/expanded/);

    // Click to expand
    await node.click();
    await expect(node).toHaveClass(/expanded/);

    // Sub-links should exist
    await page.waitForTimeout(500);
    const links = subLinks.locator('a');
    await expect(links).toHaveCount(3);

    // Click to collapse
    await node.click();
    await expect(node).not.toHaveClass(/expanded/);
  });

  test('Blog and Contact have correct link behavior', async ({ page }) => {
    const blog = page.locator('#node-blog');
    await expect(blog).toHaveAttribute('href', '#');

    const contact = page.locator('#node-contact');
    await expect(contact).toHaveAttribute('href', 'mailto:hello@example.com');
  });

  test('mobile responsive — no overflow, all elements visible', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForTimeout(2500);

    // Center and all nodes should be visible
    await expect(page.locator('#center')).toBeVisible();
    for (const id of ['#node-projects', '#node-blog', '#node-contact', '#node-social']) {
      await expect(page.locator(id)).toBeVisible();
    }

    // SVG lines should be hidden on mobile
    const svg = page.locator('.lines-svg');
    await expect(svg).toHaveCSS('display', 'none');
  });

  test('breathing animation keyframes are active', async ({ page }) => {
    const animationName = await page.locator('#node-projects .node-circle')
      .evaluate(el => getComputedStyle(el).animationName);
    expect(animationName).toContain('breathe');
  });

  test('connector lines attach to node circles and center photo', async ({ page }) => {
    const nodes = ['projects', 'blog', 'contact', 'social'];
    const MAX_DISTANCE = 15; // px tolerance

    for (const name of nodes) {
      const result = await page.evaluate((name) => {
        const line = document.getElementById('line-' + name);
        const circle = document.querySelector('#node-' + name + ' .node-circle');
        const photo = document.getElementById('center-photo');

        const circleRect = circle.getBoundingClientRect();
        const photoRect = photo.getBoundingClientRect();

        const lineX1 = parseFloat(line.getAttribute('x1'));
        const lineY1 = parseFloat(line.getAttribute('y1'));
        const lineX2 = parseFloat(line.getAttribute('x2'));
        const lineY2 = parseFloat(line.getAttribute('y2'));

        const photoCx = photoRect.left + photoRect.width / 2;
        const photoCy = photoRect.top + photoRect.height / 2;
        const circleCx = circleRect.left + circleRect.width / 2;
        const circleCy = circleRect.top + circleRect.height / 2;

        const distToPhoto = Math.hypot(lineX1 - photoCx, lineY1 - photoCy);
        const distToCircle = Math.hypot(lineX2 - circleCx, lineY2 - circleCy);

        return { distToPhoto, distToCircle };
      }, name);

      expect(result.distToPhoto,
        `line-${name} start should be near center photo`
      ).toBeLessThan(MAX_DISTANCE);

      expect(result.distToCircle,
        `line-${name} end should be near ${name} node circle`
      ).toBeLessThan(MAX_DISTANCE);
    }
  });
});
