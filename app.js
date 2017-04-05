'use strict';

const express = require('express');
const path = require('path');

const app = express();

const port = (process.env.PORT || 3000);
app.set('port', port);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname, '/docs')));

app.get('/clap', function (req, res, next) {
  const phrase = req.query.phrase;
  const emoji = req.query.emoji || '👏';
  if (!phrase) {
    res.status(400).send('Bad Request phrase URL query required');
  }
  const tokens = phrase.trim().split(' ');
  const clapped = [];
  tokens.forEach(token => {
    clapped.push(token);
    clapped.push(emoji);
  });
  clapped.pop();
  res.send(clapped.join(' '));
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});