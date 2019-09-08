'use strict';

const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();


gulp.task('assets', function() {
    return gulp.src('app/**/*.*')
        .pipe(gulp.dest('dist'));
});
gulp.task('clean', function() {
    return del('dist');
});
gulp.task('build', gulp.series('clean', 'assets'));


gulp.task('server', function() {
    browserSync.init({
        server: 'dist'
    });
});

gulp.task('default', gulp.series('build', 'server'));
