'use strict';

var gulp = require('gulp');
var awspublish = require('gulp-awspublish');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var args = require('yargs').argv;
var fs = require('fs');


// Get the environment from the command line
// Default to dev if nothing is passed
var env = (args.env || 'dev').toLowerCase();

// Get the correcrt settings
var CONFIGS = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
var CONFIG = CONFIGS[env];


console.log('env: ', env);
console.log('config: ', CONFIG);


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
      'cache-control': 'max-age=' + CONFIG.max_age + ', no-transform, public',
      'content-type': 'application/javascript',
      'Content-Encoding': 'gzip'
  };

  gulp.src('./dist/scripts/*.js')
    .pipe(rename(function(path) {
        path.dirname += '/scripts';
    }))
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(js_headers))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());


  //
  // Deploy CSS
  //
  var css_headers = {
      'cache-control': 'max-age=' + CONFIG.max_age + ', no-transform, public',
      'content-type': 'text/css',
      'Content-Encoding': 'gzip'
  };

  gulp.src('./dist/styles/*.css')
    .pipe(rename(function(path) {
      path.dirname += '/styles';
    }))
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(css_headers))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());


  //
  // Deploy HTML
  //
  var html_options = {
      'cache-control': 'max-age=' + CONFIG.max_age + ', no-transform, public',
      'content-type': 'text/html',
      'Content-Encoding': 'gzip'
  };

  gulp.src('./dist/*.html')
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(html_options))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());


  //
  // Deploy all images except SVG (we need custom content-type headers)
  //
  var image_headers = {
      'cache-control': 'max-age=' + CONFIG.max_age + ', no-transform, public'
  };

  gulp.src(['./dist/assets/images/**/*', '!./dist/assets/images/**/*.svg'])
    .pipe(rename(function(path) {
      path.dirname = '/assets/images/' + path.dirname;
    }))
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(image_headers))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());


  //
  // Deploy SVG
  //
  var svg_headers = {
      'cache-control': 'max-age=' + CONFIG.max_age + ', no-transform, public',
      'content-type': 'image/svg+xml'
  };

  gulp.src('./dist/assets/images/**/*.svg')
    .pipe(rename(function(path) {
      path.dirname = '/assets/images/' + path.dirname;
    }))
    .pipe(awspublish.gzip())
    .pipe(publisher.publish(svg_headers))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());

});
