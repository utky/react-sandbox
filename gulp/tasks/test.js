var gulp = require('gulp');
var karma = require('gulp-karma');
var config = require('../../config');

gulp.task('test', function () {
    gulp.src('./src/js/**/*Spec.js')
      .pipe(karma({ configFile: 'karma.conf.js' }));
});
