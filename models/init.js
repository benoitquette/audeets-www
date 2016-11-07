const config = require('config');
const mongoConfig = config.get('mongo');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(mongoConfig.connect);
module.exports = mongoose;
