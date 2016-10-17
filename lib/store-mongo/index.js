'use strict';

/**
 * Module dependencies.
 */

const log = require('./../logger');
const config = require('./../../config/config.json');
const mongoose = require('mongoose');

// End of dependencies.

require('./../../models/Results');

module.exports.process = function process(task, ackCallback) {
  const db = mongoose.createConnection(config.mongo.connect);
  mongoose.Promise = require('bluebird');
  const Result = db.model('Result');
  new Result(task).save(err => {
    if (err) return log.error(err);
    return ackCallback();
  });
  mongoose.connection.close();
};
