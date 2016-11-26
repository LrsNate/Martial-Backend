const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors());
app.use(require('./controllers'));

app.listen(3000, () => {
  console.log('Example app listening on port 3000!'); // eslint-disable-line no-console
});
