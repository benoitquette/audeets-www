'use strict';

/**
 * Module dependencies.
 */

const log = require('./../lib/logger');
const program = require('commander');
const queue = require('./../lib/workers-commons/workers');
const auditor = require('./../lib/auditor');

// End of dependencies.

const packageConf = require('../package.json');
const config = require('../config/config.json');

program
  .version(packageConf.version);

program
  .command('start <name>')
  .description('Starts the queue identified by the given name')
  .action(name => {
    queue.createWorker(config.amqp.connect, name, err => {
      log.error(err);
    });
  });

program
  .command('audit')
  .description('Runs the audits of all the projects defined in the db')
  .action(() => {
    auditor.audit(config.amqp.connect);
  });

program.parse(process.argv);
