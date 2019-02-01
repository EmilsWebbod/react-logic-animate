const gulp = require('gulp');

gulp.task('default', function() {
  return gulp.src(['src/**/*.css']).pipe(gulp.dest('lib/'));
});

gulp.task(
  'watch',
  gulp.series('default', function() {
    gulp.watch('src/**/*.css', gulp.series('default'));
  })
);
