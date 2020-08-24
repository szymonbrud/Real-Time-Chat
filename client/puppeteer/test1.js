const puppeteer = require('puppeteer');
const process = require('process');

const delay = async time => {
  return new Promise(res => {
    setTimeout(res, time);
  });
};

(async () => {
  const myArgs = process.argv.slice(2);
  console.log(myArgs[0]);

  // const browser = await puppeteer.launch({ headless: false });
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(myArgs[0]);
  await page.waitForSelector('button[data-testid="anonymussLogin"]');
  await page.click('button[data-testid="anonymussLogin"]').catch(err => console.log(err));

  await page.waitForSelector('button[data-testid="yes"]');
  await page.click('button[data-testid="yes"]').catch(err => console.log(err));

  await page.waitForSelector('button[data-testid="roomButton"]');
  await page.click('button[data-testid="roomButton"]');

  await delay(1000);

  await browser.close();
})();
