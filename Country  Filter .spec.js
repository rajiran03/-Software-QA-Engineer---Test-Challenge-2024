const { test, expect } = require('@playwright/test');

test('Filter meetings by country Belgium', async ({ page }) => {
    // Navigate to the URL
    await page.goto('https://viewpoint.glasslewis.com/WD/?siteId=DemoClient', { waitUntil: 'load' });

    // Wait for the element to be present in the DOM
    const countryFilterSelector = '.country-filter';
    const countryFilter = await page.waitForSelector(countryFilterSelector);

    // Check if the element is visible
    const isVisible = await countryFilter.isVisible();
    if (!isVisible) {
        // If not visible, wait for it to become visible
        await countryFilter.waitForElementState('visible');
    }

    // Select Belgium from the country filter
    await page.selectOption(countryFilterSelector, 'Belgium');

    // Click on the Update button
    await page.click('.update-button');

    // Wait for the grid to display meetings
    await page.waitForSelector('.meeting');

    // Check if all displayed meetings are associated with Belgium
    const meetings = await page.$$('.meeting');
    for (const meeting of meetings) {
        const meetingText = await meeting.innerText();
        expect(meetingText).toContain('Belgium');
    }

    // Check if no meetings associated with other countries appear on the list
    const otherCountryMeetings = await page.$$eval('.meeting', (meetings) => {
        return meetings.filter(meeting => !meeting.innerText.includes('Belgium'));
    });
    expect(otherCountryMeetings.length).toBe(0);
});
