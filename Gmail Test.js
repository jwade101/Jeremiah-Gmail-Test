const puppeteer = require('puppeteer');
async function autoEmailLogin(){
    //This will launch the browser
    const browser = await puppeteer.launch({headless: false});


    const page = await browser.newPage();
    try {
        //Navigating to Gmail
        await page.goto('https://www.gmail.com');
        const emailField = await page.waitForSelector('input[type="email"]');
        if(emailField){
            console.log('Email Field is here');
        }else{
            console.log('Email Field is not here');
        }
        const nextButton = await page.waitForSelector('div[id="identifierNext"]');
        if(nextButton){
            console.log('Next Button is Here');
        }else{
            console.log('Next Button is not here');
        }
        //This is me filling out my email addresss
        await emailField.type('jeremiahwade95@gmail.com');
        await Promise.all([
            nextButton.click(),
            page.waitForNetworkIdle()
        ]);
        const passwordField = await page.waitForSelector('input[type="password"]');
        if(passwordField){
            console.log('Password Field is here');
        }else{
            console.log('Password Field is not here');
        }
        await passwordField.type('Jerrywade5');
        await Promise.all([
            page.keyboard.press('Enter'),
            page.waitForNetworkIdle()
        ]);
        //Expecting to be in my inbox
        const inboxTitle = await page.title();
        if(inboxTitle.includes('inbox')){
            console.log('You are in your inbox');
        }else{
            console.log('You are not in your inbox');
        }
        //Expecting to be in the primary tab
        const primaryTab = await page.waitForSelector('a[href="#inbox"]');
        if(primaryTab){
            console.log('Currently on the Primary tab!');
        }else{
            console.log('Not on the Primary tab!');
        }
        await Promise.all([
            page.click('div[gh="cm"]'),
            page.waitForNetworkIdle()
        ]);
        //Provided Send button is visible
        const sendButton = await page.waitForSelector('div[data-tooltip="Send(Ctrl-Enter)"]');
        if(sendButton){
            console.log('"Send" button is visible!');
        }else{
            throw new Error('"Send" button is not visible!');
        }
        //Clicking on to
        const toField = await page.waitForSelector('textarea[name="to"]');
        await toField.click();


        //Entering my email address
        await toField.type('jeremiahwade95@gmail.com');


        //Clickiing on subject
        const subjectField = await page.waitForSelector('input[name="subjectbox"');
        await subjectField.click();


        //Fill out "Test Subject UUID-Timestamp
        const uuid = uuidv4();
        const timeStamp = math.floor(date.now()/1000);
        const subjectBody = `Test Subject ${uuid}-${timeStamp}`;
        await subjectField.type(subjectBody);


        //Clicking into the body of the email
        const emailBody = await page.waitForSelector('div[aria-label=Message Body]');
        await emailBody.click();


        //Filling out the email body
        const uuid2 = uuidv4();
        const emailContent = `This is a test email sent at ${timeStamp}, for the purposes of checking gmail ability to send and receive ${uuid2}`;


        //Clicking Send
        await Promise.all([
            page.click('div[data-tooltip="Send(Ctrl-Enter)"]'),
            page.waitForNetworkIdle()
        ]);


        //Navigating to my inbox
        await page.goto('https://mail.google.com/mail/u/0/#inbox');


        //Expect to see new email with matching UUID and Timestamp
        const matchingEmail = await page.waitForXPath(`//span[contains(text(),"${subjectBody}")]`);
        if (matchingEmail) {
            console.log('Found email with matching UUID and timestamp subject!');
        } else {
            console.log('Failed to find email with matching UUID and timestamp subject!');
        }
        await Promise.all([
            matchingEmail.click(),
            page.waitForNetworkIdle()
        ]);
        // Expected body of email to match corresponding prompt with Timestamp and UUID2
        const emailBodyContent = await page.$eval('div[class="a3s aiL "]', (element) => element.textContent);
        if (emailBodyContent.includes(timestamp) && emailBodyContent.includes(uuid2)) {
            console.log('Body of email matches corresponding prompt with Timestamp and UUID2!');
        } else {
            console.log('Failed to match body of email with corresponding prompt!');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        // Close the browser
        await browser.close();
    }
}
autoEmailLogin();

