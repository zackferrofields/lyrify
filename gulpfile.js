var del = require('del');
var electron = require('electron-prebuilt');
var gulp = require('gulp');
var proc = require('child_process');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var webpack = require("webpack");

var webpackConfig = require('./webpack.config.js');
var paths = {
  BUILD: './dist'
};

gulp.task('clean', function(cb) {
  del([ paths.BUILD ], cb);
});

gulp.task('build', function(cb) {
  var config = Object.create(webpackConfig);
  config.plugins = config.plugins.concat(
    new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );
  webpack(config, function(err, stats) {
    if (err) {
      throw new gutil.PluginError('webpack:build', err);
    }
    gutil.log('[webpack]', stats.toString({ colors: true }));
    cb();
  });
});

gulp.task('copy', function() {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('electron', ['build'], function() {
  proc.spawn(electron, [process.env.PWD])
  .on('error', function(err) {
    console.log(err);
  });
});

gulp.task('watch', ['build', 'copy', 'electron'], function() {
  watch('src/scripts/**/*.{jsx,js}', function() {
    gulp.run('build');
  });
});

gulp.task('default', ['clean', 'build', 'copy', 'electron']);
