'use strict';

/**
 * Module dependencies.
 */

const chai = require("chai");
const proxyquire = require('proxyquire');
const sinon = require('sinon');
const fetcher = require('../../../lib/fetcher');
var connect = require('connect');
var serveStatic = require('serve-static');
const urlLib = require('url');
const fs = require('fs');
const path = require('path');
var finalhandler = require('finalhandler')
var http = require('http')

// End of dependencies.

const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));

const port = '9615';
const invalidURl = 'sdsdsqdsqdsqd.html';
const staticFile = 'www.google.com.html';
const timeout = 10000;
const pause = 3000;

describe("fetcher", function () {
  describe("#fetch()", function () {
    before(function () {
      connect()
        .use(serveStatic(__dirname))
        .use(function onerror(err, req, res, next) {
          console.log('Error in server ' + err);
        })
        .listen(port, () => {
          console.log('Server running...');
        });
    });
    it("should return an error for an invalid URL", function (done) {
      this.timeout(timeout);
      const url = urlLib.resolve('http://localhost:' + port, invalidURl);
      const spy = sinon.spy();
      fetcher.fetch(url, spy);
      setTimeout(()=> {
        expect(spy.called).to.equal(true);
        expect(spy.args[0][0]).to.equal(null);
        expect(spy.args[0][1]).to.have.string('Cannot');
        done();
      }, pause)

    });
    it("should return a static content", function (done) {
      this.timeout(timeout);
      const url = urlLib.resolve('http://localhost:' + port, staticFile);
      const spy = sinon.spy();
      fetcher.fetch(url, spy);
      setTimeout(()=> {
        expect(spy.called).to.equal(true);
        expect(spy.args[0][0]).to.equal(null);
        expect(spy.args[0][1]).to.have.string('google.load');
        done();
      }, pause)
    });
  });
});
