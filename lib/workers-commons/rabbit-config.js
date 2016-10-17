'use strict';

/**
 * Module dependencies.
 */

const RabbitSchema = require('rabbitmq-schema');
const _ = require('lodash');

// End of dependencies.

// TODO externalize the config.json link (depend. inj.?)
const rabbitConfig = require('./rabbitmq.config.json');
const schema = new RabbitSchema(rabbitConfig);

/**
 * Extracts the bindings of a queue
 * @param {string} queueName the name of the queue or the exchange
 * @param {function} callback returns the exchange, the queue and the routing
 * key
 * @return {*}
 */
function getQueueBinding(queueName, callback) {
  /* eslint-disable */
  if (!_.every(schema.getBindings(), binding => {
      if (binding.destination.queue === queueName) {
        callback(null, binding.source, binding.destination,
          binding.routingPattern);
        return false;
      }
      return true;
    })) return true;
  /* eslint-enable */
  return callback(`No queue defined with the name '${queueName}'`);
}

/**
 * @param {string} exchangeName the name of the exchange
 * @return {Object} the exchange schema - contains the name of the exchange,
 * the type and the options object
 */
function getExchange(exchangeName) {
  return schema.getExchangeByName(exchangeName);
}

module.exports = {
  getQueueBinding,
  getExchange
};
