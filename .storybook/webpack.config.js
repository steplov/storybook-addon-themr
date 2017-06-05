const path = require('path');

const cssLoader = {
  loader: 'css-loader',
  options: {
    sourceMap: true,
    modules: true,
    importLoaders: 1,
    localIdentName: '[path]-[name]-[local]'
  }
};

const postCssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    config: {
      path: path.resolve(__dirname, 'postcss.config.js')
    }
  }
};

module.exports = {
  module: {
    rules: [
      {
        test: /\.js(\?.*)?$/,
        loader: 'babel-loader',
        exclude: /node_modules\/(?!(react-toolbox\/src\/components)\/).*/
      },
      {
        test: /\.pcss$|\.css$/,
        loaders: [
          'style-loader',
          cssLoader,
          postCssLoader
        ]
      }
    ]
  }
};
