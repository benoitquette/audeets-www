const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      '@store': path.join(__dirname, '../app/store'),
      '@api': path.join(__dirname, '../app/api'),
      '@components': path.join(__dirname, '../app/components'),
      '@modules': path.join(__dirname, '../app/modules')
    }
  },
  resolveLoader: {
    root: path.join(__dirname, "../node_modules")
  },
  entry: [
    path.join(__dirname, '../app/index.jsx'),
    path.join(__dirname, '../public/stylesheets/style.css')
  ],
  output: {
    path: path.join(__dirname, '../public'),
    filename: 'javascripts/app.bundle.js'
  },
  historyApiFallback: {
    index: 'http://localhost:3000/'
  },
  module: {
    loaders: [
      // Extract css files
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      // Extract React source files
      {
        test: /\.(jsx|js)$/,
        include: /app/,
        loaders: ['babel-loader?cacheDirectory']
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin("stylesheets/style.bundle.css", {
      allChunks: true
    })
  ]
}
;
