const fetch = require('node-fetch');
const dateFormat = require('dateformat');

const jsonURL = 'https://amaten.com/group_list?order=&type=AmazonGift&limit=1';

fetch(jsonURL, {
  headers: {
    Accept: 'application/json'
  }
}).then((res) => {
  return res.json();

}).then((json) => {
  const currentTime = new Date();
  const formattedTime = dateFormat(currentTime, 'yyyy-mm-dd HH:MM:ss');
  const rate = json.gifts[0].rate;

  console.log(`${formattedTime}\t${rate}`);
});
