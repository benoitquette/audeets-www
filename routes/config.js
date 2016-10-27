const express = require('express');
const router = express.Router(); // eslint-disable-line new-cap
const config = require('./../config/config.json');

router.route('/elasticsearch')
  .get((req, res, next) => {
    console.log(config.elasticsearch);
    return res.json(config.elasticsearch);
  });

module.exports = router;
