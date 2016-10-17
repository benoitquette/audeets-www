'use strict';

/**
 * Module dependencies.
 */
const winstonConfig = require('winston-config');
const winston = require('winston');
const traverse = require('traverse');
const os = require('os');

// End of dependencies.

const config = require('../config/config.json');

traverse(config).forEach(function conf() {
  if (this.key === 'label') {
    const host = os.hostname();
    this.update(`@${host}`);
  }
});
winstonConfig.fromJson(config.logging, err => {
  if (err) throw err;
});

module.exports = winston.loggers.get('default');
