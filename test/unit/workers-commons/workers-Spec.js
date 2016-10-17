'use strict';

/**
 * Module dependencies.
 */

const chai = require("chai");
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const path = require('path');

// End of dependencies.

const queue1 = path.join('..', 'test', 'unit', 'workers-commons', 'worker-queue1-mock');
const queue2 = path.join('..', 'test', 'unit', 'workers-commons', 'worker-queue2-mock');
const exchange1 = {exchange: 'ex1'};
const modulePath = path.join(__dirname, '..', queue1, 'index.js');
const channelMock = {ack: null};
const workers = proxyquire('../../../lib/workers-commons/workers', {
  './rabbit-node': {
    consume: function (nodeUrl, queueName, callback) {
      switch (queueName) {
        case queue1:
          const message = {
            content: JSON.stringify({
              url: 'ooooo',
              project: 'pppp'
            })
          };
          return callback(null, channelMock, message);
        case queue2:
          const message2 = {
            content: JSON.stringify({
              url: 'ooooo',
            })
          };
          return callback(null, channelMock, message2);
        default:
      }
      return callback('unknown queue from mock');
    },
    publish: function (nodeUrl, exchangeName, routingKey, message, callback) {
      console.log(exchangeName);
      switch (exchangeName) {
        case exchange1.exchange:
        case 'audit':
        case 'store':
          return;
        default:
      }
      return callback('unknown exchange: ' + exchangeName);
    },
  },
});

const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));

describe("workers", function () {
  describe("#createWorker()", function () {
    it("should return an error because of unknown queue", function () {
      const spy = sinon.spy();
      workers.createWorker('nodeurl', 'this is not the name of a queue', spy);
      expect(spy.called).to.equal(true);
      const error = spy.args[0][0];
      expect(error).to.not.equal(null);
      expect(error).to.have.string('unknown queue');
      console.log(error);
    });
    it("should return no error", function () {
      channelMock.ack = sinon.spy();
      const spy = sinon.spy();
      workers.createWorker('nodeurl', queue1, spy);
      expect(channelMock.ack.called).to.equal(true);
      expect(spy.called).to.equal(false);
    });
    it("should return a validation error because of a bad task", function () {
      channelMock.ack = sinon.spy();
      const spy = sinon.spy();
      workers.createWorker('nodeurl', queue2, spy);
      expect(channelMock.ack.called).to.equal(false);
      expect(spy.called).to.equal(true);
    });
  });
  describe("#publishAuditTask()", function () {
    it("should endup gracefully", function () {
      const spy = sinon.spy();
      workers.publishAuditTask('nodeurl', {
        url    : 'url',
        project: 'projectid'
      }, spy);
      expect(spy.called).to.equal(false);
    });
  });
});
