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
gulp.task('serve', function() {
    browserSync.init({
        server: 'dist'
    });
    browserSync.watch('dist/**/*.*').on('change', browserSync.reload);
});

