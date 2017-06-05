module.exports = {
  plugins: [
    require('postcss-import')(),
    require('postcss-apply')(),
    require('postcss-nested')(),
    require('postcss-css-variables')(),
    require('postcss-color-function')()
  ]
};
