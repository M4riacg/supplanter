const path = require('path');
var webpack = require('webpack');

module.exports = {
  resolve: {
    extensions: ['.js'],
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  entry: './src/index.js',
  target: 'node',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ["es2015", "es2016", "es2017"]
        }
      }
    ]
  }
};