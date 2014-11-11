var gulp, gutil, source, browserify, server, gutil, source,
  watchify, jscs, jshint, stylish, http, express, app, url,
  proxy, logger, run;

gulp = require('gulp');
gutil = require('gutil');
source = require('vinyl-source-stream');
browserify = require('browserify');
server = require('pushstate-server');
watchify = require('watchify');
jscs = require('gulp-jscs');
jshint = require('gulp-jshint');
stylish = require('jshint-stylish');
http = require('http');
express = require('express');
app = express();
url = require('url');
proxy = require('proxy-middleware');
logger = require('morgan');
run = require('gulp-run');

gulp.task('default', ['serve']);

gulp.task('lint', ['jscs', 'jshint']);

gulp.task('jscs', function () {
  gulp.src(['./app/**/*.js', './*.js'])
    .pipe(jscs());
});

gulp.task('jshint', function () {
  return gulp.src(['./app/**/*.js', './*.js'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail'));
});

gulp.task('watch', function() {
  var bundler = watchify(browserify('./app/main.js', watchify.args));

  function rebundle() {
    return bundler.bundle()
      // log errors if they happen
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./static'));
  }
  bundler.on('update', rebundle);

  return rebundle();
});

gulp.task('serve', ['watch'], function () {
  server.start({
    port: 7111,
    directory: './'
  });
});

gulp.task('server', ['watch', 'api'], function () {
  app.use(logger({ immediate: true, format: 'dev' }));
  app.use('/api', proxy(url.parse('http://0.0.0.0:7001/api/')));

  app.use(express.static(__dirname + '/static'));


  var port = 7000;
  http.createServer(app).listen(port, function() {
    console.log('Frontend listening at %s', port);
  });
});

gulp.task('api', function () {
  run('node apiServer.js').exec();
});