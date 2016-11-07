const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const config = require('config');
const esConfig = config.get('elasticsearch');

router.route('/elasticsearch')
  .get((req, res, next) => {
    console.log(esConfig);
    return res.json(esConfig);
  });

module.exports = router;
