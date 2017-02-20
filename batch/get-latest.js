const fetch = require('node-fetch');
const jsdom = require('jsdom');
const dateFormat = require('dateformat');

const URL = 'https://gifttrade.jp/';

jsdom.env({
  url: URL,
  scripts: ["http://code.jquery.com/jquery.js"],
  done: (err, window) => {
    const $ = window.$;
    const $dom = $('#refresh tr:first-child td:nth-child(5) span:first-child');
    const percent = $dom.text();

    const currentTime = new Date();
    const formattedTime = dateFormat(currentTime, 'yyyy-mm-dd HH:MM:ss');

    console.log(`${formattedTime}\t${percent}`);
  }
});
