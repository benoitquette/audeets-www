// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'
const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader'

const config = {
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@store': path.join(__dirname, 'app/store'),
      '@api': path.join(__dirname, 'app/api'),
      '@components': path.join(__dirname, 'app/components'),
      '@modules': path.join(__dirname, 'app/modules'),
    },
  },
  resolveLoader: {
    modules: [__dirname, 'node_modules'],
  },
  entry: [
    path.join(__dirname, 'app/index.jsx'),
    path.join(__dirname, 'public/stylesheets/style.css'),
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'javascripts/app.bundle.js',
    publicPath: '/',
  },
  // devServer: {
  //   open: true,
  //   host: 'localhost',
  // },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /.*/,
      contextRegExp: /^(config)/,
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        include: /app/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env', '@babel/preset-react'] },
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, 'css-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'file-loader',
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
}

module.exports = () => {
  if (isProduction) {
    config.mode = 'production'
    config.plugins.push(new MiniCssExtractPlugin())
    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW())
  }
  else {
    config.mode = 'development'
  }
  return config
}
