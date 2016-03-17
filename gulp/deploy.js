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
var CONFIG = JSON.parse(fs.readFileSync('./config.json', 'utf8'))[env];



////////////////////////////////////////////
////////////////////////////////////////////
// DEPLOY
////////////////////////////////////////////
////////////////////////////////////////////
gulp.task('deploy', [], function() {
    console.warn('Deploying to: ', CONFIG.aws.params.Bucket);

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


    //
    // Deploy TXT
    //
    var txt_headers = {
        'cache-control': 'max-age=' + CONFIG.max_age + ', no-transform, public',
        'content-type': 'text/plain'
    };

    gulp.src('./dist/*.txt')
        .pipe(awspublish.gzip())
        .pipe(publisher.publish(txt_headers))
        .pipe(publisher.cache())
        .pipe(awspublish.reporter());


    //
    // Deploy ICO
    //
    var ico_headers = {
        'cache-control': 'max-age=' + CONFIG.max_age + ', no-transform, public',
        'content-type': 'text/plain'
    };

    gulp.src('./dist/*.ico')
        .pipe(awspublish.gzip())
        .pipe(publisher.publish(ico_headers))
        .pipe(publisher.cache())
        .pipe(awspublish.reporter());
});

