'use strict';

var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var minify = require('gulp-csso');
var pump = require('pump');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var rename = require('gulp-rename');
var del = require('del');
var server = require('browser-sync').create();
var run = require('run-sequence');

gulp.task('style', function() {
  gulp.src('source/less/style.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('compress', function (cb) {
  pump([
      gulp.src('source/js/*.js'),
      uglify(),
      gulp.dest('build/js')
    ],
    cb
  )
});

gulp.task('images', function () {
  return gulp.src('source/img/**/*.{jpg,svg,png}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('source/img'));
});

gulp.task('html', function () {
  return gulp.src('source/*.html')
    .pipe(gulp.dest('build'));
});

gulp.task('copy', function () {
  return gulp.src([
    'source/css/*.min.css',
    'source/fonts/*',
    'source/img/*.{jpg,svg,png}',
    'source/js/*.js'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('build', function (done) {
  run(
    'clean',
    'html',
    'images',
    'copy',
    'style',
    'compress',
    done
  );
});

gulp.task('serve', function() {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/less/**/*.less', ['style']);
  gulp.watch('source/js/*.js', ['compress']);
  gulp.watch('source/*.html').on('change', server.reload);
  gulp.watch('source/*html', ['html']);
});
