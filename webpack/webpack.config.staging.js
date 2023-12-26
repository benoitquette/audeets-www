const webpack = require('webpack')
const Config = require('webpack-config').default

module.exports = new Config().extend('webpack/webpack.config.shared.js').merge({
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('staging'),
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true, // eslint-disable-line camelcase
      },
      output: {
        comments: false,
      },
    }),
  ],
  mode: 'staging',
})
