var del = require('del');
var electron = require('electron-prebuilt');
var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var gutil = require('gulp-util');
var proc = require('child_process');
var watch = require('gulp-watch');
var webpack = require('webpack');

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

gulp.task('electron', function() {
  proc.spawn(electron, [process.env.PWD])
  .on('error', function(err) {
    console.log(err);
  });
});

gulp.task('watch', function() {
  watch('src/scripts/**/*.{jsx,js}', gulpSequence('build'));
});

gulp.task('default', gulpSequence('clean', ['build', 'copy'], 'electron'));
