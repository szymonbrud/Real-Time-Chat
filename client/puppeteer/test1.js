const puppeteer = require('puppeteer');
const process = require('process');

const delay = async time => {
  return new Promise(res => {
    setTimeout(res, time);
  });
};

(async () => {
  const myArgs = process.argv.slice(2);

  // const browser = await puppeteer.launch({ headless: false });
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setViewport({ width: 375, height: 667 });

  await page.goto(myArgs[0]);
  // await page.goto('http://localhost:3000');
  await page.waitForSelector('button[data-testid="anonymussLogin"]');
  await page.click('button[data-testid="anonymussLogin"]').catch(err => console.log(err));

  await page.waitForSelector('button[data-testid="yes"]');
  await page.click('button[data-testid="yes"]').catch(err => console.log(err));

  await page.waitForSelector('h4[data-testid="roomNameList"]');
  await delay(1000);
  await page.click('h4[data-testid="roomNameList"]').catch(err => console.log(err));

  await page.$eval('input[data-testid="inputMessage"]', el => (el.value = 'Hello from puppeter'));
  await page.click('button[data-testid="sendButton"]').catch(err => console.log(err));

  await delay(1000);

  await browser.close();
})();
