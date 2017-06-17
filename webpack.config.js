const { resolve } = require('path');
const webpack = require('webpack');

module.exports = function() {
  return {
    bail: true,
    devtool: false,
    entry: {
      app: "./src/index.js"
    },
    output: {
      path: resolve('./dist'),
      filename: '[name].js',
      pathinfo: true,
      library: 'JAM',
      libraryTarget: 'umd',
    },
    resolve: {
      extensions: ['.js'],
      modules: [resolve(__dirname, 'src'), 'node_modules'],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ],
    },
  };
};
