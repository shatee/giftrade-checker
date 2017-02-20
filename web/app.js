const express = require('express');
const ECT = require('ect');
const path = require('path');
const spawnSync = require('child_process').spawnSync;
const serverConf = require('./../config/server-conf');

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

app.get('/', (req, res) => {
  const tail = spawnSync('tail', [`-n ${3 * 24 * 15}`, path.join(__dirname, '../log/get-latest.log')]).output.toString();
  const data = tail.split("\n").filter((line) => {
    return /\t/.test(line);
  }).map((line) => {
    const splitted = line.split("\t");
    return {
      date: (new Date(splitted[0])).getTime(),
      rate: Number(splitted[1])
    };
  });
  return res.render('page/index.ect', {
    data
  });
});

app.listen(serverConf.port);
