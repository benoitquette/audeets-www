'use strict';

/**
 * Module dependencies.
 */

const log = require('./../logger');
const amqp = require('amqplib/callback_api');
const config = require('./rabbit-config');

// End of dependencies.

/**
 * Connect to a rabbitmq node and create a channel
 * @param {string} nodeUrl - the URL to the rabbitmq node
 * @param {} callback - the callback that handles the response
 */
function _connect(nodeUrl, callback) {
  amqp.connect(nodeUrl, (err, connection) => {
    if (err) {
      return callback(err);
    }
    return connection.createChannel((err2, channel) => {
      if (err2) {
        return callback(err2);
      }
      return callback(null, channel);
    });
  });
}

/**
 * Connects to the rabbitmq node and creates a message queue.
 *
 * @param {string} nodeUrl - the URL to the rabbitmq node
 * @param queueName - the name of the queue
 * @param callback called when a message is published in the queue. The channel
 * is passed along to allow the caller to ack the message
 * @private
 */
function consume(nodeUrl, queueName, callback) {
  _connect(nodeUrl, (err, channel) => {
    if (err) {
      return callback(err);
    }
    return config.getQueueBinding(queueName, (err2, ex, queue, key) => {
      if (err2) {
        return callback(err2);
      }
      channel.assertExchange(ex.exchange, ex.type, ex.options);
      return channel.assertQueue(queueName, ex.exchange, (err3, q) => {
        if (err3) {
          return callback(err3);
        }
        log.info("Waiting for messages in queue '%s'", q.queue);
        channel.bindQueue(q.queue, ex.exchange, key);
        return channel.consume(q.queue, message => {
          log.debug("Received message in queue '%s'", q.queue);
          callback(null, channel, message);
        }, queue.options);
      });
    });
  });
}

/**
 * Published a message to an exchange.
 *
 * @param nodeUrl - the URL to the rabbitmq node
 * @param exchangeName the name of the exchange to publish the message to
 * @param routingKey the routing key - can be an empty string
 * @param message the message to pusblish
 */
function publish(nodeUrl, exchangeName, routingKey, message, callback) {
  log.debug('In publishing');
  log.debug(` publishing to exchange '${exchangeName}'`);
  log.debug(` publishing to route '${routingKey}'`);
  _connect(nodeUrl, (err, channel) => {
    if (err) {
      return callback(err);
    }
    const ex = config.getExchange(exchangeName);
    if (!ex) {
      return callback(`Unknown exchange '${exchangeName}'`);
    }
    channel.assertExchange(ex.exchange, ex.type, ex.options);
    const str = JSON.stringify(message, null, 2);
    log.info(` publishing message: ${str}`);
    channel.publish(ex.exchange, routingKey, new Buffer(str));
    log.info(' published message');
    return setTimeout(() => {
      channel.connection.close();
    }, 500);
  });
  log.debug('Out publishing');
}

module.exports = {
  consume,
  publish
};
