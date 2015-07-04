var path = require('path');
var webpack = require('webpack');

module.exports = {
  cache: true,
  entry: {
    main: './src/main'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist/',
    filename: '[name].js',
    chunkFilename: '[chunkhash].js'
  },
  target: 'atom',
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel'
    },
    {
     test: /\.json$/,
     loader: 'json-loader'
    }]
  },
  resolve: {
    root: path.join(__dirname, 'src'),
    extensions: ['', '.js', '.jsx', '.json'],
    modulesDirectories: ['bower_components', 'node_modules'],
    alias: {
      icons: path.join(__dirname, 'src/resources/icons.js')
    }
  },
  plugins: [],
  externals: [],
  debug: true,
  devtool: 'source-map'
};
