/*jshint globalstrict: true*/
/*global require*/

'use strict'

const gulp = require('gulp')
const typescript = require('gulp-typescript')
const jdists = require('gulp-jdists')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const examplejs = require('gulp-examplejs')

gulp.task('build', function () {
  gulp.src('./src/ts/*.ts')
    .pipe(typescript({
      target: 'ES5'
    }))
    .pipe(gulp.dest('./src/js'))
})

gulp.task('jdists', function () {
  gulp.src('./src/h5emitter.jdists.js')
    .pipe(jdists())
    .pipe(rename('h5emitter.js'))
    .pipe(gulp.dest('./'))

  gulp.src('./src/compiler.jdists.js')
    .pipe(jdists())
    .pipe(rename('compiler.js'))
    .pipe(gulp.dest('./lib/'))
})

gulp.task('uglify', function () {
  gulp.src('h5emitter.js')
    .pipe(uglify())
    .pipe(rename('h5emitter.min.js'))
    .pipe(gulp.dest('./'))
})

gulp.task('example', function() {
  return gulp.src([
      'src/ts/*.ts'
    ])
    .pipe(examplejs({
      header: `
global.h5emitter = require('../h5emitter.js');
      `
    }))
    .pipe(rename({
      extname: '.js'
    }))
    .pipe(gulp.dest('test'))
})

gulp.task('dist', ['build', 'jdists', 'uglify'])