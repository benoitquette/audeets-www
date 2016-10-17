'use strict';

/**
 * Module dependencies.
 */

const log = require('./logger');
const phantom = require('phantom');

// End of dependencies.

/**
 * Fetches the rendered HTML content of the given URL.
 *
 * @param url the url of the page to fetch the content of
 * @param callback returns the HTML content
 */
function fetch(url, callback) {
  // TODO add redis support
  log.debug(`Fetching url ${url}`);
  let phantomInstance;
  let phantomPage;
  return phantom
    .create()
    .then(ph => {
      phantomInstance = ph;
      return phantomInstance.createPage();
    }, err => callback(err))
    .then(page => {
      phantomPage = page;
      return phantomPage.open(url);
    }, err => callback(err))
    .then(status => {
      if (status === 'fail') {
        callback(`could not fetch the page ${url}`);
      }
      return phantomPage.property('content');
    }, err => callback(err))
    .then(content => {
      callback(null, content);
      phantomPage.close();
      phantomInstance.exit();
    }, err => callback(err));
}

module.exports = {
  fetch
};
