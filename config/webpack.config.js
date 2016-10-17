const Config = require('webpack-config').default;
const environment = require('webpack-config').environment;

environment.setAll({
  env: () => process.env.NODE_ENV
});

module.exports = new Config().extend('config/webpack.config.[env].js');
