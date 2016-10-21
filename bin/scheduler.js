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
 */
function audit() {
  const Project = mongoose.model('Project');
  const nodeUrl = config.crawlingSchedule;

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
          const message = JSON.stringify({
            url: project.url,
            project: project._id, // eslint-disable-line
            nodeUrl
          });
          ch.publish(EXCHANGE, '', new Buffer(message));
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
  cron.schedule(() => {
    audit(config.amqp.connect);
  });
}

module.exports = {
  start,
  audit
};
