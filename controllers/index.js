const express = require('express');

const router = express.Router();

router.use('/works', require('./works'));

module.exports = router;
