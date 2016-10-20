/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const config = require('./../config/config.json');
const bluebird = require('bluebird');
const _ = require('lodash');
const cron = require('node-cron');
var amqp = require('amqplib/callback_api');

// End of dependencies.

const EXCHANGE = 'crawl';

/**
 * Loads all the projects from the db and run the audit of each of them by
 * creating a crawling task.
 *
 * @param {string} nodeUrl the URL to the rabbitmq node
 */
function _audit(nodeUrl) {
  const Project = mongoose.model('Project');

  // connect to rabbitmq
  amqp.connect(nodeUrl, (err, conn) => {
    if (err) return console.log(err);
    conn.createChannel((err, ch) => {
      if (err) console.log(err);
      ch.assertExchange(EXCHANGE, 'fanout', {durable: true});

      // loop through the projects and send a crawl task
      Project.find((err, projects) => {
        if (err) console.log(err);
        return _.each(projects, project => {
          ch.publish(EXCHANGE, '', new Buffer({
            url: project.url,
            project: project._id, // eslint-disable-line
            nodeUrl
          }.toString()));
        });
      });

      // close the rabbitmq connection
      setTimeout(() => {
        conn.close();
      }, 500);
    });
  });
}

/**
 * Entry point: setup the cron-like scheduler to start at 2am every day
 */
function start() {
  mongoose.Promise = bluebird;
  // schedule a cron for the audits
  cron.schedule(config.crawlingSchedule, () => {
    _audit(config.amqp.connect);
  });
}

module.exports = {
  start
};
