const webpack = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: ['./index.js'],
  output: {
    path: `${__dirname}/lib`,
    filename: 'scripts.min.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },

};
