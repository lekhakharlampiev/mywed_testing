'use strict';

const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');

const cssFiles = [
    './app/css/fonts.css',
    './app/css/normalize.css',
    './app/css/style.css',
    './app/css/header.css',
    './app/css/main.css',
    './app/css/media_queries.css'
]
const jsFiles = [
    './app/js/data.js',
    './app/js/index.js'
] 

gulp.task('styles', function() {
    return gulp.src(cssFiles)
    .pipe(concat('style.css'))
    .pipe(cleanCSS({
        level: 2
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
});
gulp.task('js', function() {
    return gulp.src(jsFiles)
    .pipe(concat('script.js'))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify({
        toplevel: true
    }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream())
});
gulp.task('img', function() {
    return gulp.src('./app/img/*.*')
        .pipe(gulp.dest('./dist/img'));
});
gulp.task('photos', function() {
    return gulp.src('./app/photos/*.*')
        .pipe(gulp.dest('./dist/photos'));
});
gulp.task('fonts', function() {
    return gulp.src('./app/fonts/*.*')
        .pipe(gulp.dest('./dist/fonts'));
});
gulp.task('clean', function() {
    return del(['dist/*'])
});
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    //gulp.watch('./app/css/**/*.css', 'styles')
    //gulp.watch('./app/js/**/*.js', 'js')
    //gulp.watch('./*.html').on('change', browserSync.reload);
});
gulp.task('build', gulp.series('clean', gulp.parallel('styles', 'js','img', 'photos', 'fonts') ));
gulp.task('default', gulp.series('build', 'server'));