const bodyParser = require('body-parser');
const express = require('express');
const WorksHelper = require('../helpers/worksHelper');

const router = express.Router();
const worksHelper = new WorksHelper();
const textParser = bodyParser.text({ limit: '50Mb' });

router.get('/version/latest', (req, res) => {
  worksHelper.getLatestVersion().then((dump) => {
    res.send(dump);
  });
});

router.put('/version/new', textParser, (req, res) => {
  worksHelper.createNewVersion(req.body).then(() => res.sendStatus(201));
});

module.exports = router;
