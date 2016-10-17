'use strict';

/**
 * Module dependencies.
 */

// End of dependencies.

function process(task, ackCallback) {
  return ackCallback(null, {});
}

module.exports = {
  process,
};
