'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const port = (process.env.PORT || 3000);
app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname, '/docs')));

function clapPhrase(phrase, emoji) {
  emoji = emoji || '👏';
  const tokens = phrase.trim().split(' ');
  const clapped = [];
  tokens.forEach(token => {
    clapped.push(token);
    clapped.push(emoji);
  });
  clapped.pop();
  return clapped.join(' ');
}

app.get('/clap', function (req, res) {
  const phrase = req.query.phrase;
  const emoji = req.query.emoji;
  if (!phrase) {
    res.status(400).send('Bad Request phrase URL query required');
  }
  res.send(clapPhrase(phrase, emoji));
});

app.post('/slack', function (req, res) {
  if (req.body.token !== process.env.SLACK_VERIFY_TOKEN) {
    return res.sendStatus(400);
  }

  const phrase = req.body.text;

  res.send({
    response_type: "in_channel",
    text: clapPhrase(phrase)
  });
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});