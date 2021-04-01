const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'build.js'
  },  
  mode: process.env.NODE_ENV,
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    port: 9010,
    hot: true,
    publicPath: '/',
    inline: true,
    historyApiFallback: true,
    open: true,
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
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
  resolve: {
    mainFields: ['browser', 'module', 'main'],
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      process: 'process'
    },
    // This fallback option accounts for the lack of polyfill in webpack 5. Without these settings, a litany of errors follows.
    fallback: {
      assert: "assert",
      buffer: "buffer",
      console: "console-browserify",
      constants: "constants-browserify",
      crypto: "crypto-browserify",
      domain: "domain-browser",
      events: "events",
      fs: "fs.realpath",
      http: "stream-http",
      https: "https-browserify",
      import: "import-local",
      net: "net-browserify",
      path: "path-browserify",
      punycode: "punycode",
      process: "process",
      querystring: "querystring-es3",
      stream: "stream-browserify",
      _stream_duplex: "readable-stream/duplex",
      _stream_passthrough: "readable-stream/passthrough",
      _stream_readable: "readable-stream/readable",
      _stream_transform: "readable-stream/transform",
      _stream_writable: "readable-stream/writable",
      string_decoder: "string_decoder",
      sys: "util",
      timers: "timers-browserify",
      tty: "tty-browserify",
      url: "url",
      util: require.resolve("util"),
      vm: "vm-browserify",
      zlib: "browserify-zlib"
    }
  },
}