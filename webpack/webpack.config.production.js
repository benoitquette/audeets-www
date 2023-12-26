const webpack = require('webpack')
const Config = require('webpack-config').default

module.exports = new Config().extend('webpack/webpack.config.shared.js').merge({
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
  mode: 'production',
  optimization: {
    minimize: true,
  },
})
