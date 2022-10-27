const MangleCssClassPlugin = require('mangle-css-class-webpack-plugin');

module.exports = {
    style: {
    postOptions: {
        plugins: [
          require('craco-plugin-env'),
          require('tailwindcss'),
          require('autoprefixer'),
          new MangleCssClassPlugin({
            log: true,
          }),
        ],
      },
    },
}