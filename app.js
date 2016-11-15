const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.sendStatus(204);
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!'); // eslint-disable-line no-console
});
