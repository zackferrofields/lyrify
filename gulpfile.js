var gulp = require('gulp');
var watch = require('gulp-watch');
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

gulp.task('electron', ['build'], function() {
  proc.spawn(electron, [process.env.PWD])
  .on('error', function(err) {
    console.log(err);
  });
});

gulp.task('watch', ['build', 'electron'], function() {
  watch('.app/**/*.{js,jsx}', ['build']);
});

gulp.task('default', ['build', 'electron', 'watch']);
