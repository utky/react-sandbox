var gulp = require('gulp');
var eslint = require('gulp-eslint');
var config = require('../../config');

gulp.task('eslint', function () {
    gulp.src([config.js.src])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});
