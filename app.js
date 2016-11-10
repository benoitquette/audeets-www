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
const fallback = require('express-history-api-fallback');
const webpackConfig = require('./webpack/webpack.config');
const scheduler = require('./bin/scheduler');
const projects = require('./routes/projects');
require('./models/init');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

// end module dependencies

// passport config
passport.use(new BasicStrategy(
  function(username, password, done) {
    console.log('passport....');
    if (username !== 'guest') {
      return done(null, false, {message: 'Incorrect username.'});
    }
    if (password !== 'beta2016') {
      return done(null, false, {message: 'Incorrect password.'});
    }
    return done(null, {user: username});
  }
));

// common paths
const root = path.join(__dirname, 'public');
const defaultDocName = 'index.html';
const defaultDoc = path.join(root, defaultDocName);

// Express setup
var app = express();
app.use(passport.initialize());
app.use(compression());
app.use(favicon(path.join(root, 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/api/projects', projects);
if (process.env.NODE_ENV === 'development') {
  app.use(express.static(root));
  app.use(logger('dev'));
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
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
  app.use(fallback(defaultDocName, {root}));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(defaultDoc));
    res.end();
  });
} else {
  if (process.env.NODE_ENV === 'production') {
    app.use(passport.authenticate('basic', {session: false}));
  }
  app.use(express.static(root));
  app.use(fallback(defaultDocName, {root}));
  app.get('*',
    function response(req, res) {
      res.sendFile(defaultDoc);
    });
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// start the scheduler that will trigger the audits according to the pattern
// define in the config file
scheduler.start();

module.exports = app;
