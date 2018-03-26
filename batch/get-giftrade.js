const {JSDOM} = require('jsdom');
const dateFormat = require('dateformat');
const fs = require('fs');
const config = require('../config/config');
const {Slack} = require('../lib/Slack');

const URL = 'https://gifttrade.jp/';
const lastAmountFile = __dirname + '/../var/giftrade-last-amount.json';

let lastAmount = {
  face: 0,
  price: 0,
  rate: 1
};

try {
  lastAmount = require(lastAmountFile);
} catch (_) {
  fs.writeFileSync(lastAmountFile, lastAmount);
}

JSDOM.fromURL(URL, {
  scripts: ["http://code.jquery.com/jquery.js"]
}).then((dom) => {
	const window = dom.window;
  const $ = require('jquery')(window);
  const face = Number($('#refresh tr:first-child td:nth-child(2) span:first-child').text().replace(',', ''));
  const price = Number($('#refresh tr:first-child td:nth-child(3) span:first-child').text().replace(',', ''));
  const percent = $('#refresh tr:first-child td:nth-child(5) span:first-child').text();
  const rate = percent / 100;
  fs.writeFileSync(lastAmountFile, JSON.stringify({
    face,
    price,
    rate
  }, null, '  '));

  if (config.alert.enabled && rate <= config.alert.threshold && rate < lastAmount.rate) {
    Slack.post(
      config.slack.channel,
      `[giftrade-checker] 額面: ¥${face.toLocaleString()}, 売価: ¥${price.toLocaleString()}, 率: ${percent}`
    );
  }

  const currentTime = new Date();
  const formattedTime = dateFormat(currentTime, 'yyyy-mm-dd HH:MM:ss');
  console.log(`${formattedTime}\t${percent}`);
});

