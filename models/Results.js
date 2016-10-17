'use strict';

/**
 * Module dependencies
 */

var mongoose = require('mongoose');

// end module dependencies

var ResultSchema = new mongoose.Schema({
  timestamp: Date,
  category: String,
  url: String,
  project: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'},
  rules: [{
    rule: String,
    title: String,
    check: Boolean,
    details: [{
      text: String,
      link: String
    }]
  }]
});

mongoose.model('Result', ResultSchema);

