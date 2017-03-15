var webpack = require('webpack');
var path= require('path');

module.exports = {
  entry: {
    common: [
      'react',
      'react-dom',
      'react/lib/ReactComponentWithPureRenderMixin.js'
    ],
    index: './src/js/index/index.js',
    login: './src/js/login/index.js',
  },
  output: {
    path: path.resolve(__dirname, './dist/js'),
    filename: '[name].js',
    publicPath: "/js",
  },
  // If your project need jQuery, you can uncomment this
  // externals: {
  //   jquery: 'jQuery.noConflict()'
  // },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: '/node_modules/',
        loader: 'babel-loader',
        options: {
          "presets": [
            'es2015',
            'react'
          ]

        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 3,
    })
  ],
  //devtool: '#eval-source-map'
  devtool: '#source-map'
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
