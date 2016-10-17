'use strict';

/**
 * Module dependencies.
 */

const Ajv = require('ajv');

// End of dependencies.

const validator = new Ajv();

/**
 * Generates the structure of audit results.
 * @param task the origin task that triggered the audit
 * @param rules the results of the audit
 * @return {{collection: *, document: {timestamp: Date, url: *, project: *,
 * rules: *}}}
 */
function generateAuditResults(task, rules) {
  return {
    category: '',
    timestamp: new Date(),
    url: task.url,
    project: task.project,
    rules
  };
}

/**
 * Validate a json object according to a json schema.
 * @param json the object to validate
 * @param schemaPath the path to the schema file on the disk
 * @param callback called on success and on errors
 * @return {*}
 */
function validateJson(json, schemaPath, callback) {
  if (!validator.getSchema(schemaPath)) {
    const schema = require(schemaPath); // eslint-disable-line
    validator.addSchema(schema, schemaPath);
  }
  if (!validator.validate(schemaPath, json)) {
    return callback(validator.errors);
  }
  return callback();
}

module.exports = {
  generateAuditResults,
  validateJson
};
