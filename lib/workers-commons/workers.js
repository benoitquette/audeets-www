'use strict';

/**
 * Module dependencies.
 */

const log = require('./../logger');
const path = require('path');
const utilities = require('./../utilities');
const rabbit = require('./rabbit-node');
const fs = require('fs');

// End of dependencies.

const taskSchemaName = 'task.schema.json';

/**
 * Publishes a task to the 'store' exchange.
 *
 * @param {string} nodeUrl the URL of the rabbitmq node
 * @param {Object} task the task to publish.
 * @param {function} callback called to pass on errors
 * @private
 */
function _publishStoreTask(nodeUrl, task, callback) {
  rabbit.publish(nodeUrl, 'store', '', task, callback);
}

/**
 * Publishes a task to the 'audit' exchange.
 *
 * @param nodeUrl the URL of the rabbitmq node
 * @param task the task to publish
 */
function publishAuditTask(nodeUrl, task, callback) {
  rabbit.publish(nodeUrl, 'audit', '', task, callback);
}

/**
 * Publishes a task to the 'crawl' exchange.
 *
 * @param nodeUrl the URL of the rabbitmq node
 * @param task the task to publish
 */
function publishCrawlTask(nodeUrl, task, callback) {
  rabbit.publish(nodeUrl, 'crawl', '', task, callback);
}

/**
 * Delegates a task to a worker. The worker is dynamically created and the
 * process() is then invoked. If the worker provides an output, the methods
 * forwards it for storage.
 *
 * The worker is created via the parameter name. It loads the module 'index.javascripts'
 * in the directory 'lib/{name}'.
 *
 * @param nodeUrl the URL to the rabbit-mq
 * @param name the name of the worker. Used to load the module, and also to
 * extract the audit category.
 * @param task the task to execute
 * @param channel the rabbit-mq channel to use
 * @param message the rabbit-mq message the task originated from. Used for
 * acking.
 * @return {*}
 * @private
 */
function _processTask(nodeUrl, name, task, channel, message, callback) {
  const modulePath = path.join(__dirname, '..', name, 'index.js');
  const worker = require(modulePath); // eslint-disable-line
  return worker.process(task, (err, results) => {
    if (err) {
      return callback(err);
    }
    // if the task produces some results/output, then we publish the results
    // to the storage exchange. Before sending them, we add the category to
    // the results.
    if (results) {
      const newResults = results;
      newResults.category = name.split('-')[1];
      // TODO add results schema validation
      _publishStoreTask(nodeUrl, newResults, callback);
    }
    // finally, we ack the message, regardless of the type of task
    return channel.ack(message);
  });
}

/**
 * Creates a consumer instance bound to a named queue.
 *
 * @param nodeUrl the URL to the rabbit-mq
 * @param name the name of the queue to bind to
 */
function createWorker(nodeUrl, name, callback) {
  rabbit.consume(nodeUrl, name, (err, channel, message) => {
    if (err) {
      return callback(err);
    }
    const task = JSON.parse(message.content);
    let schemaPath = path.join(__dirname, '..', name, taskSchemaName);
    try {
      fs.statSync(schemaPath);
    } catch (e) {
      // if a schema file is not defined for the worker, we use the
      // default one
      schemaPath = path.join(__dirname, taskSchemaName);
    }
    return utilities.validateJson(task, schemaPath, err2 => {
      if (err2) {
        return callback(err2);
      }
      log.info('Received validated task %s', JSON.stringify(task));
      return _processTask(nodeUrl, name, task,
        channel, message, callback);
    });
  });
}

module.exports = {
  createWorker,
  publishAuditTask,
  publishCrawlTask
};
