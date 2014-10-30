var gulp, gutil, source, browserify, server, gutil, source,
  watchify;

gulp = require('gulp');
gutil = require('gutil');
source = require('vinyl-source-stream');
browserify = require('browserify');
server = require('pushstate-server');
watchify = require('watchify');

gulp.task('default', ['serve']);

gulp.task('watch', function() {
  var bundler = watchify(browserify('./app/main.js', watchify.args));

  bundler.on('update', rebundle);

  function rebundle() {
    return bundler.bundle()
      // log errors if they happen
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./static'));
  }

  return rebundle();
});

gulp.task('serve', ['watch'], function () {
  server.start({
    port: 7111,
    directory: './static'
  });
});
