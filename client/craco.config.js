const MangleCssClassPlugin = require('mangle-css-class-webpack-plugin');

module.exports = {
    style: {
    postOptions: {
        plugins: [
          require('craco-plugin-env'),
          require('tailwindcss'),
          require('autoprefixer'),
          new MangleCssClassPlugin({
            classNameRegExp: '[cl]-[a-z][a-zA-Z0-9_]*',
            log: true,
          }),
        ],
      },
    },
}