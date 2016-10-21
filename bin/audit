#!/usr/bin/env node

const mongoose = require('./../models/init');
require('./scheduler').audit(() => {
  mongoose.connection.close();
});
