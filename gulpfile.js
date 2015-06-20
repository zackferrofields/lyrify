var gulp = require('gulp');
var proc = require('child_process');
var electron = require('electron-prebuilt');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('build', function() {
  browserify({
    entries: 'app/index.jsx',
    extensions: ['.jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist'));
});

gulp.task('electron', function() {
  proc.spawn(electron, [process.env.PWD])
  .on('error', function(err) {
    console.log(err);
  });
});

gulp.task('default', ['build', 'electron']);
