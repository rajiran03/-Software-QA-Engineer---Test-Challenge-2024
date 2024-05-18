const { test, expect } = require('@playwright/test');

test('Verify landing on Activision Blizzard Inc. vote card page', async ({ page }) => {
    // Navigate to the URL
    await page.goto('https://viewpoint.glasslewis.com/WD/?siteId=DemoClient', { waitUntil: 'load' });

    // Wait for the search box label to appear
    const searchBoxLabelSelector = 'label:has-text("Search for a company...")';
    await page.waitForSelector(searchBoxLabelSelector);

    // Get the input element associated with the label
    const searchBoxInput = await page.$('input[aria-labelledby="txt-multiselect-search"]');
    if (!searchBoxInput) {
        throw new Error('Search box input not found');
    }

    // Type the company name in the search box
    await searchBoxInput.fill('Activision Blizzard Inc');

    // Wait for a brief moment for search results to appear
    await page.waitForTimeout(1000);

    // Click on the first search result
    await page.click('li.search-result');

    // Wait for elements that indicate the page has loaded successfully
    await page.waitForSelector('.Activision ');

    // Verify landing on the Activision Blizzard Inc. vote card page
    const pageTitle = await page.title();
    expect(pageTitle).toContain('Activision Blizzard Inc.');

    // Verify "Activision Blizzard Inc" appears in the top banner
    const topBannerText = await page.textContent('.top-banner');
    expect(topBannerText).toContain('Activision Blizzard Inc');
});
