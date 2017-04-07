const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

const port = (process.env.PORT || 3000);
app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(express.static(path.join(__dirname, '/docs')));

function clapPhrase(phrase, inputEmoji) {
  const emoji = inputEmoji || '👏';
  const tokens = phrase.trim().split(' ');
  const clapped = [];
  tokens.forEach((token) => {
    clapped.push(token);
    clapped.push(emoji);
  });
  clapped.pop();
  return clapped.join(' ');
}

app.get('/clap', (req, res) => {
  const phrase = req.query.phrase;
  const emoji = req.query.emoji;
  if (!phrase) {
    return res.status(400).send('Bad Request phrase URL query required');
  }
  return res.send(clapPhrase(phrase, emoji));
});

app.post('/slack', (req, res) => {
  if (req.body.token !== process.env.SLACK_VERIFY_TOKEN) {
    return res.sendStatus(400);
  }

  let phrase = req.body.text;
  let emoji;

  const regex = /^(.*?)\[(.*?)\]$/g;
  const match = regex.exec(phrase);

  if (match) {
    phrase = match[1];
    emoji = match[2];
  }

  return res.send({
    response_type: 'in_channel',
    text: clapPhrase(phrase, emoji),
  });
});

app.get('/slack/redirect', (req, res) => {
  const options = {
    uri: `https://slack.com/api/oauth.access?code=${req.query.code}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`,
    method: 'GET',
  };

  request(options, (error, response, body) => {
    const JSONresponse = JSON.parse(body);
    if (!JSONresponse.ok) {
      console.log(JSONresponse);
      res.send(`Error encountered: \n ${JSON.stringify(JSONresponse)}`).status(200).end();
    } else {
      console.log(JSONresponse);
      res.send('Success!');
    }
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
