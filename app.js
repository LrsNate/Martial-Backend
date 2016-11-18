const express = require('express');
const redis = require('redis');

const app = express();
const redisClient = redis.createClient();

app.get('/', (req, res) => {
  res.sendStatus(204);
});

app.get('/ping', (req, res) => {
  redisClient.ping(() => {
    res.sendStatus(202);
  });
});

app.get('/works/latest', (req, res) => {
  redisClient.get('works:versions:latest', (err, result) => {
    res.send(result);
  });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
