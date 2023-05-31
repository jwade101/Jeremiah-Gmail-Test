const puppeteer = require('puppeteer');
const { v4: uuidv4 } = require('uuid');

async function generateRandomUUIDUnixTimestamp() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Generate a random UUID
    const randomUUID = uuidv4();
    const randomUUID2 = uuidv4();

    // Get the current Unix timestamp
    const unixTimestamp = Math.floor(Date.now() / 1000);
    const unixTimestamp2 = Math.floor(Date.now() / 1000);

    await browser.close();

    return { randomUUID, randomUUID2, unixTimestamp, unixTimestamp2 };
}

async function yahooTest() {
    const { randomUUID, randomUUID2, unixTimestamp,unixTimestamp2 } = await generateRandomUUIDUnixTimestamp();
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

    //Waiting for mail to be visible and clicking mail to go to my inbox
    await page.waitForSelector('a[target="_self"]');
    await page.click('a[target="_self"]');

    //Expecting to see compose, clicking compose, and waiting for send button to be visible
    await page.waitForSelector('a[data-test-id="compose-button"]');
    await page.click('a[data-test-id="compose-button"]');
    await page.waitForSelector('button[data-test-id="compose-send-button"]');
    await page.waitForTimeout(3000);

    //Clicking on the 'To' field and filling out the same email address as the login
    await page.waitForSelector('input[aria-owns="react-typehead-list-to"]');
    await page.click('input[aria-owns="react-typehead-list-to"]');
    await page.type('input[aria-owns="react-typehead-list-to"]','jeremiah.auctane@yahoo.com');
    await page.keyboard.press('Enter');

    //Clicking on subject and filling out the test subject
    const subject = `Test Subject ${randomUUID}-${unixTimestamp}`;
    await page.click('input[data-test-id="compose-subject"]');
    await page.waitForTimeout(1000);
    await page.type('input[data-test-id="compose-subject"]', subject);

    //Clicking into the body of the email and filling out the body of the email
    await page.waitForTimeout(1000);
    await page.click('div[data-test-id="rte"]');
    const bodyEmail = `This is a test email at ${unixTimestamp2}, for the purposes of checking Yahoo ability to send and receive ${randomUUID2}`;
    await page.type('div[data-test-id="rte"]', bodyEmail);

    // Click Send
    await page.click('button[data-test-id="compose-send-button"]');
    await page.waitForTimeout(2000);

    // Navigate to the inbox and expect to see the new email with matching UUID and timestamp subject
    //await page.click('a[data-test-folder-name="inbox"]');
    await page.reload();
    await page.waitForTimeout(1000);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(1000);
    await page.waitForSelector(`span[title="${subject}"]`);

    // Click on the email
    await page.click(`span[title="${subject}"]`);

    // Expect the body of the email to match the corresponding prompt with Timestamp and UUID2
    await page.waitForSelector(`div:has-text("${body}")`);

}
yahooTest();