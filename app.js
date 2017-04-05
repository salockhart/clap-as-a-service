'use strict';

const express = require('express');
const path = require('path');

const app = express();

const port = (process.env.PORT || 3000);
app.set('port', port);

app.get('/', function(req, res, next) {
  const phrase = req.query.phrase;
  const emoji = req.query.emoji || '👏';
  if (!phrase) {
    res.status(400).send('Bad Request phrase URL query required');
  }
  const tokens = phrase.split(' ');
  const clapped = [];
  tokens.forEach(token => {
    clapped.push(token);
    clapped.push(emoji);
  });
  clapped.pop();
  res.send(clapped.join(' '));
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
