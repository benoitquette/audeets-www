const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@store': path.join(__dirname, '../app/store'),
      '@api': path.join(__dirname, '../app/api'),
      '@components': path.join(__dirname, '../app/components'),
      '@modules': path.join(__dirname, '../app/modules')
    }
  },
  resolveLoader: {
    modules: [__dirname, 'node_modules'],
  },
  entry: [
    path.join(__dirname, '../app/index.jsx'),
    path.join(__dirname, '../public/stylesheets/style.css')
  ],
  output: {
    path: path.join(__dirname, '../public'),
    filename: 'javascripts/app.bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      // Extract css files
      {
        test: /\.css$/,
        //loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      // Extract React source files
      {
        test: /\.(jsx|js)$/,
        include: /app/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env', '@babel/preset-react'] },
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /.*/,
      contextRegExp: /^(config)/,
    }),
    new MiniCssExtractPlugin()
  ]
};
