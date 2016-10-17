'use strict';

/**
 * Module dependencies.
 */

const chai = require('chai');
const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');
const proxyquire = require('proxyquire');
const sinon = require('sinon');

// End of dependencies.

const expect = chai.expect;
chai.should();
chai.use(require('chai-things'));

const basePath = '../../../lib/audit-search-basic/rules';
const validUrl = 'url1';
const invalidUrl = 'url2';
const searchBasic = proxyquire('../../../lib/audit-search-basic/index', {
  './../fetcher': {
    fetch: function (url, callback) {
      switch (url) {
        case validUrl:
          callback(null, '<html/>');
        case invalidUrl:
          callback('invalid url');
        default:
      }
    },
  }
});

describe("search-basic", function () {
  describe("#process()", function () {
    it("should error if invalid URL", function () {
      const spy = sinon.spy();
      searchBasic.process({url: invalidUrl}, spy);
      expect(spy.called).to.equal(true);
      expect(spy.args[0][0]).to.not.equal(null);
    });
    it("should send the results via the callback if valid URL", function () {
      const spy = sinon.spy();
      searchBasic.process({url: validUrl}, spy);
      expect(spy.called).to.equal(true);
      expect(spy.args[0][0]).to.equal(null);
      expect(spy.args[0][1]).to.not.equal(null);
      expect(spy.args[0][1]).to.not.be.undefined;
    });
  });
  describe("#checkMarkup()", function () {
    it("should detect h1 tag", function () {
      var content = "<html><body><h1>this is a h1 title</h1></body></html>";
      var results = searchBasic._checkMarkup(content);
      expect(results).to.exist;
      expect(results).to.not.be.undefined;
      expect(results).to.not.be.empty;
      let toCheck = require(path.join(basePath, 'include-h1.js')).validate(cheerio.load(content));
      toCheck.check = true;
      results.should.include(toCheck);
    });
    it("should detect missing h1 tag", function () {
      var content = "<html><body></body></html>";
      var results = searchBasic._checkMarkup(content);
      expect(results).to.exist;
      expect(results).to.not.be.undefined;
      expect(results).to.not.be.empty;
      let toCheck = require(path.join(basePath, 'include-h1.js')).validate(cheerio.load(content));
      toCheck.check = false;
      results.should.include(toCheck);
    });
    it("should detect the page title", function () {
      var content = "<html><head><title>this is the page title</title></head><body></body></html>";
      var results = searchBasic._checkMarkup(content);
      expect(results).to.exist;
      expect(results).to.not.be.undefined;
      expect(results).to.not.be.empty;
      let toCheck = require(path.join(basePath, 'include-page-title.js')).validate(cheerio.load(content));
      toCheck['check'] = true;
      results.should.include(toCheck);
    });
    it("should detect a missing page title", function () {
      var content = "<html><head></head><body></body></html>";
      var results = searchBasic._checkMarkup(content);
      expect(results).to.exist;
      expect(results).to.not.be.undefined;
      expect(results).to.not.be.empty;
      let toCheck = require(path.join(basePath, 'include-page-title.js')).validate(cheerio.load(content));
      toCheck['check'] = false;
      results.should.include(toCheck);
    });
    it("should detect a page title longer than 65 chars", function () {
      var content = "<html><head><title>this is a page title that is more than 65 chars. this is a page title that is more than 65 chars</title></head><body></body></html>";
      var results = searchBasic._checkMarkup(content);
      expect(results).to.exist;
      expect(results).to.not.be.undefined;
      expect(results).to.not.be.empty;
      let toCheck = require(path.join(basePath, 'page-title-length.js')).validate(cheerio.load(content));
      toCheck['check'] = false;
      results.should.include(toCheck);
    });
    it("should not detect a page title shorter than 65 chars", function () {
      var content = "<html><head><title>this is a page title that is shorter than 65 chars</title></head><body></body></html>";
      var results = searchBasic._checkMarkup(content);
      expect(results).to.exist;
      expect(results).to.not.be.undefined;
      expect(results).to.not.be.empty;
      let toCheck = require(path.join(basePath, 'page-title-length.js')).validate(cheerio.load(content));
      toCheck['check'] = true;
      results.should.include(toCheck);
    });
    it("should detect a missing meta description", function () {
      var content = "<html><head></head><body></body></html>";
      var results = searchBasic._checkMarkup(content);
      expect(results).to.exist;
      expect(results).to.not.be.undefined;
      expect(results).to.not.be.empty;
      let toCheck = require(path.join(basePath, 'include-meta-description.js')).validate(cheerio.load(content));
      toCheck['check'] = false;
      results.should.include(toCheck);
    });
    it("should recognize a meta description", function () {
      var content = "<html><head><meta name='description' content='this is a meta description'/></head><body></body></html>";
      var results = searchBasic._checkMarkup(content);
      expect(results).to.exist;
      expect(results).to.not.be.undefined;
      expect(results).to.not.be.empty;
      let toCheck = require(path.join(basePath, 'include-meta-description.js')).validate(cheerio.load(content));
      toCheck['check'] = true;
      results.should.include(toCheck);
    });
    it("should detect a meta description is longer than 150 chars", function () {
      var content = "<html><head><meta name='description' content='this is a meta description. this is a meta description. this is a meta description. this is a meta description. this is a meta description. this is a meta description. '/></head><body></body></html>";
      var results = searchBasic._checkMarkup(content);
      expect(results).to.exist;
      expect(results).to.not.be.undefined;
      expect(results).to.not.be.empty;
      let toCheck = require(path.join(basePath, 'meta-description-length.js')).validate(cheerio.load(content));
      toCheck['check'] = false;
      results.should.include(toCheck);
    });
    it("should not detect a meta description id shorter than 150 chars", function () {
      var content = "<html><head><meta name='description' content='this is a meta description'/></head><body></body></html>";
      var results = searchBasic._checkMarkup(content);
      expect(results).to.exist;
      expect(results).to.not.be.undefined;
      expect(results).to.not.be.empty;
      let toCheck = require(path.join(basePath, 'meta-description-length.js')).validate(cheerio.load(content));
      toCheck['check'] = true;
      results.should.include(toCheck);
    });
    it("should parse the static homepage of Le Monde and return the adequat rules", function () {
      var content = fs.readFileSync(path.join(__dirname, 'www.lemonde.fr.html'));
      var results = searchBasic._checkMarkup(content);
      console.info(results);
      require('./www.lemonde.fr.json').forEach((rule) => {
        results.should.include.something.that.deep.equals(rule);
      });
    })
    it("should parse the static homepage of Google and return the adequat rules", function () {
      var content = fs.readFileSync(path.join(__dirname, 'www.google.com.html'));
      var results = searchBasic._checkMarkup(content);
      console.info(results);
      require('./www.google.com.json').forEach((rule) => {
        results.should.include(rule);
      });
    })
  });
});
