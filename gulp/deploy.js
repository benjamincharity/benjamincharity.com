'use strict';

var gulp = require('gulp');
var awspublish = require('gulp-awspublish');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var args = require('yargs').argv;
var fs = require('fs');


// Get the environment from the command line
// default to dev if nothing is passed
var env = (args.env || 'dev').toLowerCase();

//
// Read the settings from the correct file
var CONFIG = JSON.parse(fs.readFileSync('./config/' + env + '.json', 'utf8'));




////////////////////////////////////////////
////////////////////////////////////////////
// DEPLOY
////////////////////////////////////////////
////////////////////////////////////////////
gulp.task('deploy', [], function() {


  var publisher = awspublish.create(CONFIG.aws);


  //
  // Deploy Javascript
  //
  var js_headers = {
    'headers': {
      'cache-control': 'max-age=' + CONFIG.max_age + ', no-transform, public',
      'content-type': 'application/javascript',
      'Content-Encoding': 'gzip'
    }
  };

  gulp.src('./dist/scripts/*.js')
    .pipe(publisher.cache())
    .pipe(rename(function (path) {
        path.dirname += '/scripts';
    }))
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(js_headers))
    .pipe(awspublish.reporter());


  //
  // Deploy CSS
  //
  var css_headers = {
    'headers': {
      'cache-control': 'max-age=' + CONFIG.max_age + ', no-transform, public',
      'content-type': 'text/css',
      'Content-Encoding': 'gzip'
    }
  };

  gulp.src('./dist/styles/*.css')
    .pipe(publisher.cache())
    .pipe(rename(function (path) {
      path.dirname += '/styles';
    }))
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(css_headers))
    .pipe(awspublish.reporter());


  //
  // Deploy HTML
  //
  var html_options = {
    'headers': {
      'cache-control': 'max-age=' + CONFIG.max_age + ', no-transform, public',
      'content-type': 'text/html',
      'Content-Encoding': 'gzip'
    }
  };

  gulp.src('./dist/*.html')
    .pipe(awspublish.gzip())
    .pipe(publisher.cache())
    .pipe(publisher.publish(html_options))
    .pipe(awspublish.reporter());


  //
  // Deploy all images except SVG (we need custom content-type headers)
  //
  var image_headers = {
    'headers': {
      'cache-control': 'max-age=' + CONFIG.max_age + ', no-transform, public'
    }
  };

  gulp.src(['./dist/images/**/*', '!./dist/images/**/*.svg'])
    .pipe(publisher.cache())
    .pipe(rename(function (path) {
      path.dirname = '/images/' + path.dirname;
    }))
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(image_headers))
    .pipe(awspublish.reporter());


  //
  // Deploy SVG
  //
  var svg_headers = {
    'headers': {
      'cache-control': 'max-age=' + CONFIG.max_age + ', no-transform, public',
      'content-type': 'image/svg+xml'
    }
  };

  gulp.src('./dist/images/**/*.svg')
    .pipe(publisher.cache())
    .pipe(rename(function (path) {
      path.dirname = '/images/' + path.dirname;
    }))
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(svg_headers))
    .pipe(awspublish.reporter());

});

