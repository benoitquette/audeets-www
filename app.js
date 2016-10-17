'use strict';

/**
 * Module dependencies
 */

const express = require('express');
const compression = require('compression');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const fallback = require('express-history-api-fallback');

// end module dependencies

require('./models/Projects');
require('./models/Results');
const config = require('./config/config.json');
const api = require('./routes/index');
const webpackConfig = require('./config/webpack.config');

// connect to mongodb
mongoose.connect(config.mongo.connect);

const root = path.join(__dirname, 'public');
var app = express();
app.use(compression());
app.use(favicon(path.join(root, 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(root));
app.use('/api', api);

const defaultDoc = path.join(root, 'index.html');
if (process.env.NODE_ENV === 'development') {
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
      noInfo: false,
      quiet: false
    }
  });
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.use(fallback('index.html', {root}));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(defaultDoc));
    res.end();
  });
} else {
  app.use(fallback('index.html', {root}));
  app.get('*', function response(req, res) {
    res.sendFile(defaultDoc);
  });
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
