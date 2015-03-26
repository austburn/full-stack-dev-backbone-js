var gulp, gutil, source, browserify, gutil, source,
  watchify, jscs, jshint, stylish, http, express, app, url,
  proxy, logger, run, mocha;

gulp = require('gulp');
gutil = require('gutil');
source = require('vinyl-source-stream');
browserify = require('browserify');
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
mocha = require('gulp-mocha');

gulp.task('default', ['server']);

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

gulp.task('test', function () {
  run('mocha --recursive').exec();
});

gulp.task('watch', function() {
  var bundler = watchify(browserify('./app/main.js', watchify.args));

  function rebundle() {
    return bundler.bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./static'));
  }
  bundler.on('update', rebundle);

  return rebundle();
});

gulp.task('server', ['watch', 'api'], function () {
  app.use(logger('dev', { immediate: true }));
  app.use('/api', proxy(url.parse('http://0.0.0.0:7001/api/')));

  app.use(express.static(__dirname + '/static'));


  var port = 7000;
  http.createServer(app).listen(port, function() {
    console.log('Frontend listening at %s', port);
  });
});

gulp.task('api', function () {
  run('node ./api/apiServer.js').exec();
});
