const puppeteer = require('puppeteer-firefox');

async function yahooTest() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    //Navigating to the Yahoo login page
    await page.goto('https://login.yahoo.com');

    //Expecting to see the Email field and Next Button
    await page.waitForSelector('input[name="username"]');
    await page.waitForSelector('input[name="signin"]');

    //Filling in Email Address and clicking Next
    await page.type('input[name="username"]', 'jeremiah.auctane@yahoo.com');
    await page.click('input[name="signin"]');

    //Expecting to see the password prompt
    await page.waitForSelector('input[name="password"]');

    //Filling in password and clicking next
    await page.type('input[name="password"]', 'Jerrymindy123!');
    await page.click('button[name="verifyPassword"]');

    //Going to my inbox
    await page.goto('https://mail.yahoo.com/');

    //Expecting to see compose, clicking compose, and waiting for send button to be visible
    await page.waitForSelector('a[data-test-id="compose-button"]');
    await page.click('a[data-test-id="compose-button"]');
    await page.waitForSelector('button[data-test-id="compose-send-button"]');

    //Clicking on the 'To' field and filling out the same email address as the login
    await page.click('input[aria-label id="message-to-field"]');
    await page.fill('input[aria-label id="message-to-field"]','jeremiah.wade@auctane.com');

    //Clicking on subject and filling out the test subject

}
yahooTest();