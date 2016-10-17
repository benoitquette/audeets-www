'use strict';

/**
 * Module dependencies.
 */

const log = require('./../logger');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const utilities = require('../utilities');
const fetcher = require('./../fetcher');

// End of dependencies.

/**
 * Load all the rules from the disk and check the given
 * content file against them.
 * @param content the HTML content to audit
 * @return {Array} the results of the audit
 */
function _checkMarkup(content) {
  const $ = cheerio.load(content);
  const dir = path.join(__dirname, 'rules');
  const results = [];
  fs.readdirSync(dir).forEach(file => {
    if (path.extname(file) === '.js') {
      try {
        const rule = require(path.join(dir, file)).validate($); // eslint-disable-line
        results.push(rule);
        log.debug(JSON.stringify(rule));
      } catch (e) {
        log.error(e);
      }
    }
  });
  return results;
}

/**
 * Process the given task by getting the content of the given URL
 * and checks it for basic SEO ruling.
 * @param task the details of the task to process
 * @param ackCallback to callback once the audit is over. Important
 * to ack the message.
 */
function process(task, ackCallback) {
  fetcher.fetch(task.url, (err, content) => {
    if (err) {
      return ackCallback(err);
    }
    // require('fs').writeFileSync('page.'+Date.now()+'.html', content);
    const rules = _checkMarkup(content);
    const results = utilities.generateAuditResults(task, rules);
    return ackCallback(null, results);
  });
}

module.exports = {
  process,
  _checkMarkup
};
