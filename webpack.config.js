const { resolve } = require('path');
const webpack = require('webpack');

var root = __dirname;
var rootSrc = resolve(root, './src');

module.exports = function() {
  return {
    context: rootSrc,
    bail: true,
    devtool: false,
    entry: {
      app: 'index.js',
    },
    output: {
      path: resolve('www', 'bundle'),
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
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['stage-0'],
              },
            },
          ],
        },
      ],
    },
  };
};
