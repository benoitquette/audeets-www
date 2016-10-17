'use strict';

/**
 * Module dependencies.
 */

const chai = require("chai");
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const config = require('../../../lib/workers-commons/rabbit-config');
const schema = require('../../../lib/workers-commons/rabbitmq.config.json');

// End of dependencies.

const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));

describe("rabbit-config", function () {
  describe("#getQueueBinding()", function () {
    it("should return the queue binding", function () {
      const spy = sinon.spy();
      const queueName = schema[0].bindings[0].destination.queue;
      config.getQueueBinding(queueName, spy);
      expect(spy.called).to.equal(true);
      const error = spy.args[0][0];
      expect(error).to.equal(null);
      const exchange = spy.args[0][1];
      expect(exchange.exchange).to.equal(schema[0].exchange);
      const queue = spy.args[0][2];
      expect(queue.queue).to.equal(queueName);
      const routingKey = spy.args[0][3];
      expect(routingKey).to.equal(schema[0].bindings[0].routingPattern);
    });
    it("should return an error if the queue does not exist", function () {
      const spy = sinon.spy();
      config.getQueueBinding('sdsqdsqd', spy);
      expect(spy.called).to.equal(true);
      const error = spy.args[0][0];
      expect(error).to.not.equal(null);
      const exchange = spy.args[0][1];
      expect(exchange).to.be.undefined;
      const queue = spy.args[0][2];
      expect(queue).to.be.undefined;
      const routingKey = spy.args[0][3];
      expect(routingKey).to.be.undefined;
    });
    it("should return an error if the queue name is null", function () {
      const spy = sinon.spy();
      config.getQueueBinding(null, spy);
      expect(spy.called).to.equal(true);
      const error = spy.args[0][0];
      expect(error).to.not.equal(null);
      const exchange = spy.args[0][1];
      expect(exchange).to.be.undefined;
      const queue = spy.args[0][2];
      expect(queue).to.be.undefined;
      const routingKey = spy.args[0][3];
      expect(routingKey).to.be.undefined;
    });
  });
  describe("#getExchange()", function () {
    it("should return the exchange", function () {
      const spy = sinon.spy();
      const exchangeName = schema[0].exchange;
      const ex = config.getExchange(exchangeName);
      expect(ex).to.not.be.undefined;
      expect(ex).to.not.equal(null);
      expect(ex.exchange).to.equal(exchangeName);
    });
    it("should return undefined if the exchange does not exist", function () {
      const spy = sinon.spy();
      const ex = config.getExchange('sdsqdsqd');
      expect(ex).to.be.undefined;
    });
  });
});
