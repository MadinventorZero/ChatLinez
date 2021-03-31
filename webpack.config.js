const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    splash: path.resolve(__dirname, './client/index.html')
  },
  output: {
    path: path.resolve(__dirname, 'project'),
    publicPath: '/',
    filename: 'bundle.js'
  },  
  mode: process.env.NODE_ENV,
  devServer: {
    contentBase: path.resolve(__dirname, 'project'),
    compress: true,
    port:9010,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      }
    }
  },
  module: {
    rules: [
      {
        test: /.(html)$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ]

  },
  resolveLoader: {
    modules: ['node_modules'],
    extensions: ['.js', '.json'],
    mainFields: ['loader', 'main'],
  },
}