'use strict';

/**
 * Module dependencies.
 */

const log = require('./logger');
const workers = require('./workers-commons/workers');
const config = require('./../config/config.json');
const mongoose = require('mongoose');
const _ = require('lodash');

// End of dependencies.

require('./../models/Projects');

/**
 * Publishes a crawl task for the given project.
 *
 * @param {string} nodeUrl the URL to the rabbitmq node
 * @param {Object} project the project to publish
 * @private
 */
function _processProject(nodeUrl, project) {
  // TODO add crawling strategy (no crawling, all, or n levels)
  workers.publishCrawlTask(nodeUrl, {
    url: project.url,
    project: project._id, // eslint-disable-line
    nodeUrl
  }, err => {
    log.error(err);
  });
}

/**
 * Loads all the projects from the db and run the audit of each of them by
 * creating a crawling task.
 *
 * @param {string} nodeUrl the URL to the rabbitmq node
 */
function audit(nodeUrl) {
  mongoose.connect(config.mongo.connect);
  mongoose.Promise = require('bluebird');
  const Project = mongoose.model('Project');
  Project.find((err, projects) => {
    if (err) log.error(err);
    return _.each(projects, project => {
      _processProject(nodeUrl, project);
    });
  });
  mongoose.connection.close();
}

module.exports = {
  audit
};

