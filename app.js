const bluebird = require('bluebird');
const cors = require('cors');
const express = require('express');
const moniker = require('moniker');
const redis = require('redis');

const app = express();
app.use(cors());
bluebird.promisifyAll(redis.RedisClient.prototype);

function getRedisClient() {
  return redis.createClient();
}

app.get('/works/latest', (req, res) => {
  const redisClient = getRedisClient();
  redisClient.getAsync('works:versions:latest').then((latestVersion) => { // eslint-disable-line arrow-body-style
    return redisClient.getAsync(`works:version:${latestVersion}`);
  }).then((dump) => {
    res.send(dump);
  });
});

app.get('/works/versions', (req, res) => {
  const redisClient = getRedisClient();
  redisClient.lrangeAsync('works:versions:all', 0, -1).then((list) => {
    res.send(list);
  });
});

app.get('/works/versions/:id', (req, res) => {
  res.send(404);
});

app.put('/works/version', (req, res) => {
  const redisClient = getRedisClient();
  const body = null;
  redisClient.set('key', body, () => {
    res.send(201);
  });
});

app.get('/random', (req, res) => {
  res.send(moniker.choose());
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!'); // eslint-disable-line no-console
});
