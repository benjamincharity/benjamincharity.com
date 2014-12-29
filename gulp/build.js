'use strict';

var gulp = require('gulp');
var compass = require('gulp-compass');
var replace = require('gulp-replace');
var args    = require('yargs').argv;
var fs = require('fs');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license']
});


// Get the environment from the command line
// default to dev if nothing is passed
var env = (args.env || 'dev').toLowerCase();

// Read the settings from the correct file
var CONFIG = JSON.parse(fs.readFileSync('./config/' + env + '.json', 'utf8'));

function handleError(err) {
  console.error(err.toString());
  this.emit('end');
}

gulp.task('styles', function () {
  return gulp.src('app/styles/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: '.tmp/styles',
      sass: 'app/styles'
    }))
    .on('error', handleError)
    .pipe(gulp.dest('.tmp/styles'))
    .pipe($.size());
});

gulp.task('humans', function () {
  var currentDate = new Date();
  return gulp.src('app/humans.txt')
    .pipe(replace('@@LastUpdated', currentDate))
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

gulp.task('scripts', [], function () {
  // ignore the lib folder because it throws too many errors
  return gulp.src(['app/scripts/**/*.js', '!app/scripts/libs/*.js'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.size());
});

gulp.task('partials', function () {
  return gulp.src('app/partials/**/*.html')
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.ngHtml2js({
      moduleName: 'bc',
      prefix: 'partials/'
    }))
    .pipe(gulp.dest('.tmp/partials'))
    .pipe($.size());
});

gulp.task('html', ['styles', 'scripts', 'partials', 'humans'], function () {
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  var assets = $.useref.assets();

  return gulp.src('app/*.html')
    .pipe($.inject(gulp.src('.tmp/partials/**/*.js'), {
      read: false,
      starttag: '<!-- inject:partials -->',
      addRootSlash: false,
      addPrefix: '../'
    }))
    .pipe(assets)
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify({preserveComments: $.uglifySaveLicense}))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

gulp.task('images', function () {
  return gulp.src(['app/images/**/*', '!app/images/**/*.svg'])
    .pipe($.cache($.imagemin({
      optimizationLevel: 7,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size());
});

gulp.task('svgs', function () {
  return gulp.src('app/images/**/*.svg')
    .pipe(gulp.dest('dist/images'))
    .pipe($.size());
});

gulp.task('fonts', function () {
  return gulp.src($.mainBowerFiles())
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'))
    .pipe($.size());
});

gulp.task('clean', function () {
  return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.rimraf());
});

gulp.task('build', ['html', 'partials', 'images', 'svgs', 'fonts', 'humans']);
