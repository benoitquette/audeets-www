'use strict';

/**
 * Module dependencies.
 */

const log = require('./../logger');
const util = require('util');
const google = require('googleapis');
const _ = require('lodash');
const utilities = require('../utilities');

// End of dependencies.

const pagespeed = google.pagespeedonline('v2');
const config = require('../../config/config.json');
const sourceCode = 'gpsi';

/**
 * Format a given GPSI rule summary to an internal format.
 *
 * ex GPSI:
 * { "format":"...", "args": [{...},{...},{...}] }
 *
 * will be formatted as: { "text": "..." }
 *
 * Each different argument type is handled differently and accordingly.
 * A warning is logged if an unknown type is found.
 *
 * @param {Object} details the summary detail to format
 * @param {function} callback called when an unknown argument type is found
 * @return {*}
 * @private
 */
function _formatDetails(details, callback) {
  if (_.isNil(details) || _.isEmpty(details)) {
    return undefined;
  }
  let text = details.format;
  let link = '';
  if (details.args) {
    details.args.forEach(arg => {
      switch (arg.type) {
        case 'HYPERLINK':
          text = text.replace('{{BEGIN_LINK}}', '');
          text = text.replace('{{END_LINK}}', '');
          link = arg.value;
          break;
        case 'INT_LITERAL':
        case 'BYTES':
        case 'DURATION':
        case 'PERCENTAGE':
          text = text.replace(util.format('{{%s}}', arg.key),
            arg.value);
          break;
        case 'URL':
          text = text.replace(util.format('{{%s}}', arg.key),
            arg.value);
          link = arg.value;
          break;
        default:
          callback(arg.type);
      }
    });
  }
  return link ? {text, link} : {text};
}

/**
 * Called when an unknown argument type is found when parsing the GPSI results.
 * @param {string} type the unknown type found
 * @private
 */
function _onUnknownArg(type) {
  log.warn(`Unhandled arg type '${type}'`);
}

/**
 * Formats a GPSI urlBlocks structure to an internal format. In the GPSI
 * results, the url blocks are used to give out more details about the rule, but
 * also list out impacted URLs. Internally, we simply convert each block to a
 * detail object that we will insert into the audit results.
 *
 * ex: GPSI:
 * {
 *  "header": { "format": "...", "args": [{...},{...},{...}] },
 *  "urls": [
 *      { "result": { "format": "...", "args": [{...},{...},{...}] } },
 *      { "result": { "format": "...", "args": [{...},{...},{...}] } },
 *      { "result": { "format": "...", "args": [{...},{...},{...}] } },
 *  ]
 * }
 *
 * will be formatted as:
 * [
 *  { "text": "..." },
 *  { "text": "..." },
 *  { "text": "..." },
 *  { "text": "..." }
 * ]
 *
 * @param {Object} rule the parent node of the urlBlocks
 * @return {*}
 * @private
 */
function _formatUrlBlocks(rule) {
  const res = [];
  if (rule.urlBlocks) {
    rule.urlBlocks.forEach(block => {
      if (block && !_.isEmpty(block)) {
        const details = _formatDetails(block.header, _onUnknownArg);
        res.push(details);
        details.urls = [];
        if (block.urls) {
          block.urls.forEach(url => {
            const moreDetails = _formatDetails(url.result,
              _onUnknownArg);
            details.urls.push(moreDetails);
          });
        }
      }
    });
  }
  return res; // urlBlocks.length === 0 ? undefined : urlBlocks;
}

/**
 * Loops through the GPSI rules and formats each of them to the internal format.
 * @param {Object} gpsiRules the rules to format
 * @return {*}
 * @private
 */
function _format(gpsiRules) {
  return _.chain(gpsiRules)
    .omitBy(_.isNil)
    .omitBy(_.isEmpty)
    .map((rule, key) => {
      log.debug(`formatting gpsi rule ${key}`);
      const details = [_formatDetails(rule.summary, _onUnknownArg)];
      const extraDetails = _formatUrlBlocks(rule);
      return {
        rule: key,
        title: rule.localizedRuleName,
        check: rule.ruleImpact === 0,
        details: _.union(details, extraDetails),
        source: sourceCode
      };
    })
    .value();
}

/**
 * Processes the given task. Run Google Page Speed Insights via the googleapis
 * and format the results to the internal format.
 *
 * @param {Object} task info about the task: url etc.
 * @param {function} ackCallback to be called when the task has been properly
 * processed.
 * @return {*|Object}
 */
function process(task, ackCallback) {
  const params = {
    url: task.url,
    key: config.gpsi.api_key
  };
  return pagespeed.pagespeedapi.runpagespeed(params, (err, res) => {
    if (err) {
      return ackCallback(err);
    }
    log.debug(`gpsi results: ${JSON.stringify(res)}`);
    const gpsiResults = res.formattedResults.ruleResults;
    const rules = _format(gpsiResults);
    const results = utilities.generateAuditResults(task, rules);
    return ackCallback(null, results);
  });
}

module.exports = {
  process,
  _formatDetails,
  _formatUrlBlocks,
  _format
};
