import { expect } from 'chai';
import { afterEach } from 'node:test';
import { chromium } from 'playwright-chromium';

let browser;
let page;

describe('E2E tests', function () {
  this.timeout(6000);

  before(async () => {
    //browser = await chromium.launch({ headless: false, slowMo: 500 });
    browser = await chromium.launch();
  });

  after(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    page = await browser.newPage();
  });
  afterEach(async () => {
    await page.close();
  });

  it('loaded and showed messages by clicking the "Refresh" button', async () => {
    await page.route('**/jsonstore/messenger', (route) =>
      route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({
          1: { author: 'John', content: 'Hello!' },
          2: { author: 'Jane', content: 'Hi there!' },
        }),
      })
    );

    // Navigate to your local web page (adjust the file path accordingly)
    await page.goto('http://localhost:5500');

    // Click the "Refresh" button
    await page.click('#refresh');

    // Get the messages from the textarea after clicking refresh
    const messageText = await page.$eval('#messages', (el) => el.value);

    // Assert that the messages are displayed correctly
    expect(messageText).to.equal('John: Hello!\nJane: Hi there!');
  });
  it('should send a message and clear the input fields', async () => {
    // Mock the network request for sending the message
    await page.route('**/jsonstore/messenger', (route) => {
      const request = route.request();
      if (request.method() === 'POST') {
        const postData = request.postDataJSON();
        expect(postData).to.deep.equal({ author: 'John', content: 'Hello!' });
        route.fulfill({
          contentType: 'application/json',
          body: JSON.stringify({ author: 'John', content: 'Hello!' }),
        });
      } else {
        route.continue();
      }
    });

    // Navigate to your local web page (adjust the file path accordingly)
    await page.goto('http://localhost:5500');

    // Fill in the author and content fields
    await page.fill('#author', 'John');
    await page.fill('#content', 'Hello!');

    // Click the "Submit" button
    await page.click('#submit');

    // Wait for the network request to complete
    await page.waitForResponse('**/jsonstore/messenger');
    // Click the "Refresh" button
    await page.click('#refresh');

    // Check that the input fields are cleared after submission
    const authorValue = await page.$eval('#author', (el) => el.value);
    const contentValue = await page.$eval('#content', (el) => el.value);

    // Assert that the input fields are now empty
    expect(authorValue).to.equal('');
    expect(contentValue).to.equal('');
  });
});
