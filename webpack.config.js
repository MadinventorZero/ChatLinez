const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.resolve(__dirname),
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, './client'),
    filename: 'index.js'
  },  
  mode: process.env.NODE_ENV,
  devServer: {
    contentBase: path.resolve(__dirname, './client'),
    compress: false,
    port:9010,
    hot: true,
    publicPath: '/',
    proxy: {
      '/api': {
        target: 'http://localhost:3010',
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
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ]

  },
  resolve: {
    mainFields: ['browser', 'module', 'main'],
    modules: ['node_modules'],
    extensions: ['.js', '.json'],
    // This fallback option accounts for the lack of polyfill in webpack 5. Without these settings, a litany of errors follows.
    fallback: {
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
      "crypto": false,
    }
  },
}