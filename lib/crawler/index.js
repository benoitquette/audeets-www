'use strict';

/**
 * Module dependencies.
 */

const _ = require('lodash');
const workers = require('../workers-commons/workers');

// End of dependencies.

/**
 * Crawls the site at the given URL and returns all the living URLs of the site.
 *
 * @param url the URL of the site to crawl
 * @return {*[]} the complete set of living URLs of the site
 */
function _crawlSite(url) {
  // TODO implement site crawling
  return [url];
}

/**
 * Process the given task by getting the content of the given URL
 * and crawling the site for all URLs to audit.
 *
 * @param task the details of the task to process
 * @param ackCallback to callback once the audit is over. Important
 * to ack the message.
 */
function process(task, ackCallback) {
  _.each(_crawlSite(task.url), url => {
    workers.publishAuditTask(task.nodeUrl, {
      url,
      project: task.project
    });
  });
  return ackCallback();
}

module.exports = {
  process
};

