var del = require('del');
var electron = require('electron-prebuilt');
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var gutil = require('gulp-util');
var proc = require('child_process');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var webpackDevCompiler = null;
var paths = {
  BUILD: './dist'
};
var env = {
  DEV: 'development',
  PRD: 'production'
};

function getWebpackConfig(key) {
  var config = Object.create(webpackConfig);
  switch (key) {
    default:
    case env.PRD:
      config.plugins = config.plugins.concat(
        new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } }),
        new webpack.optimize.UglifyJsPlugin()
      );
      break;
    case env.DEV:
      config.devtool = 'source-map';
      config.debug = true;
      config.plugins = config.plugins.concat(
        new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('development') } })
      );
      break;
  }
  return config;
}

gulp.task('clean', function(cb) {
  del([ paths.BUILD ], cb);
});

gulp.task('webpack', function(cb) {
  webpack(getWebpackConfig(), function(err, stats) {
    if (err) throw new gutil.PluginError('webpack:build', err);
    gutil.log('[webpack]', stats.toString({ colors: true }));
    cb();
  });
});

gulp.task('webpack:build-dev', function(cb) {
  if (!webpackDevCompiler) webpackDevCompiler = webpack(getWebpackConfig(env.DEV));
  webpackDevCompiler.run(function(err, stats) {
    if (err) throw new gutil.PluginError('webpack:build-dev', err);
    gutil.log('[webpack:build-dev]', stats.toString({ colors: true }));
    cb();
  });
});

gulp.task('copy', function() {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  watch('src/scripts/**/*.{jsx,js}', gulpSequence('webpack:build-dev'));
});

gulp.task('electron', function() {
  proc.spawn(electron, [process.env.PWD])
  .on('error', function(err) {
    console.log(err);
  });
});

gulp.task('default', gulpSequence('clean', ['webpack', 'copy'], 'electron'));

gulp.task('develop', ['default'], function() {
  gulp.watch(['src/scripts/**/*.{jsx,js}'], ['webpack:build-dev']);
});
