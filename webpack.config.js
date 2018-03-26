const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'emit-kit.js',
    library: 'emitKit',
    libraryTarget: 'umd',
    libraryExport: 'default',

    // HACK: Fix webpack global object incorrectly defaulting to 'window'
    globalObject: 'typeof self !=="undefined" ? self : this',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
