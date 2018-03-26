const express = require('express');
const ECT = require('ect');
const path = require('path');
const fs = require('fs');
const spawnSync = require('child_process').spawnSync;
const access = require('safe-access');
const bodyParser = require('body-parser');
const config = require('./../config/config');

const viewPath = path.join(__dirname, '/view');

const app = express();
app.set('views', viewPath);
const ectRender = ECT({
  watch: true,
  root: viewPath,
  ext: '.ect'
});
app.set('view engine', 'ect');
app.engine('ect', ectRender.render);
app.use(express.static(path.join(__dirname, '/resource')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  function format(text) {
    return text.split("\n").filter((line) => {
      return /\t/.test(line);
    }).map((line) => {
      const splitted = line.split("\t");
      return {
        date: (new Date(splitted[0])).getTime(),
        rate: Number(splitted[1])
      };
    });
  }


  const giftrade = format(spawnSync('tail', [
    `-n ${7 * 24 * 4}`,
    path.join(__dirname, '../log/get-giftrade.log')
  ]).output.toString());

  const amaten = format(spawnSync('tail', [
    `-n ${7 * 24 * 4}`,
    path.join(__dirname, '../log/get-amaten.log')
  ]).output.toString());

  return res.render('page/index.ect', {
    giftrade,
    amaten,
    config
  });
});

app.post('/config', (req, res) => {
  const reqJSON = req.body;
  let nextConfig = Object.assign({}, config);
  nextConfig.alert.enabled = access(reqJSON, 'alertEnabled');
  fs.writeFileSync(__dirname + '/../config/config.json', JSON.stringify(nextConfig, null, '  '));
	res.json({
		status: 200,
		data: {
			alertEnabled: nextConfig.alert.enabled
		}
	});
});

app.listen(config.server.port);

