'use strict';

/**
 * Module dependencies.
 */

const chai = require("chai");
var amqp = require('amqplib/callback_api');
const mockAmqp = require('./amqplib-mock');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

// End of dependencies.

const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));
amqp.connect = mockAmqp.connect;

var exchange1 = {
  exchange: 'ex1',
  type    : 'topic',
  options : {}
}
var exchange2 = {
  exchange: 'ex2',
  type    : 'fanout',
  options : {}
};
var queue1 = {
  queue: 'q1'
}
const routingKey = 'routing.key';

var node = proxyquire('../../../lib/workers-commons/rabbit-node', {
  './rabbit-config': {
    getQueueBinding: function (name, callback) {
      switch (name) {
        case queue1.queue:
          return callback(null, exchange1, queue1, routingKey);
        default:
      }
      return callback('unknown queue from mock', null, null, null);
    },
    getExchange    : function (name) {
      switch (name) {
        case exchange1.exchange:
          return exchange1;
        case exchange2.exchange:
          return exchange2;
        default:
      }
      return null;
    },
  }
});

describe("rabbit-node", function () {
  describe("#consume()", function () {
    it("should return the message that has been published", function () {
      mockAmqp.resetMock();
      const content = 'test';
      const spy = sinon.spy();
      node.consume('', queue1.queue, spy);
      mockAmqp.connect('', (err, conn) => {
        conn.createChannel((err, channel) => {
          channel.publish(exchange1.exchange, routingKey, content, null, (err) => {
            console.log(err);
          })
        })
      });
      const err = spy.args[0][0];
      const channel = spy.args[0][1];
      const message = spy.args[0][2];
      expect(err).to.equal(null);
      expect(channel).to.exist;
      expect(channel).to.not.be.undefined;
      expect(message.content).to.equal(content)
    });
    it("should not consume message when published to an unknown exchange", function () {
      mockAmqp.resetMock();
      const spy = sinon.spy();
      node.consume('', queue1.queue, spy);
      mockAmqp.connect('', (err, conn) => {
        conn.createChannel((err, channel) => {
          channel.publish('ddddd', routingKey, 'test', null, (err) => {
            console.log(err);
          })
        })
      });
      expect(spy.called).to.equal(false);
    });
    it("should return an error when trying to consume messages from an unknown queue", function () {
      mockAmqp.resetMock();
      const spy = sinon.spy();
      node.consume('', 'qdqsdsq', spy);
      expect(spy.called).to.equal(true);
    });
    it("should not consume a message when published to an unknown route", function () {
      mockAmqp.resetMock();
      const spy = sinon.spy();
      node.consume('', queue1.queue, spy);
      mockAmqp.connect('', (err, conn) => {
        conn.createChannel((err, channel) => {
          channel.publish(exchange1.exchange, 'dddd', 'test', null, (err) => {
            console.log(err);
          })
        })
      });
      expect(spy.called).to.equal(false);
    });
  });
  describe("#publish()", function () {
    it("should return a channel and no error", function () {
      mockAmqp.resetMock();
      const content = 'test';
      const spy = sinon.spy();
      node.consume('', queue1.queue, spy);
      node.publish('', exchange1.exchange, routingKey, content);
      const err = spy.args[0][0];
      const channel = spy.args[0][1];
      const message = spy.args[0][2];
      expect(err).to.equal(null);
      expect(channel).to.exist;
      expect(channel).to.not.be.undefined;
      console.log(spy.args[0]);
      expect(message.content.toString()).to.equal(new Buffer(JSON.stringify(content)).toString())
    });
    it("should not consume a message when published to an unknown exchange", function () {
      mockAmqp.resetMock();
      const spy = sinon.spy();
      node.consume('', queue1.queue, spy);
      node.publish('', 'ddddd', routingKey, 'test', () => {
      });
      expect(spy.called).to.equal(false);
    });
    it("should not consume a message when published to an unknown route", function () {
      mockAmqp.resetMock();
      const spy = sinon.spy();
      node.consume('', queue1.queue, spy);
      node.publish('', exchange1.exchange, 'dddd', 'test');
      expect(spy.called).to.equal(false);
    });
  });
});
