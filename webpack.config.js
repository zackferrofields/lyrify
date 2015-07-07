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
    root: __dirname,
    extensions: ['', '.js', '.jsx', '.json'],
    modulesDirectories: ['bower_components', 'node_modules'],
    alias: {
      icons: path.join(__dirname, 'src/resources/icons.js'),
      'rx': path.join(__dirname, 'node_modules/rx/index.js'),
      'rx.binding': path.join(__dirname, 'node_modules/rx/dist/rx.binding.js'),
      'rx.virtualtime': path.join(__dirname, 'node_modules/rx/dist/rx.virtualtime.js')
    }
  },
  plugins: [
    new webpack.optimize.DedupePlugin()
  ],
  externals: [{

  }]
};
