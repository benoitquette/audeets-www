require('./../models/Projects');
const config = require('./../config/config.json');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(config.mongo.connect);
module.exports = mongoose;
