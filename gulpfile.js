var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    eslint = require('gulp-eslint');

gulp.task('scripts', ['lint'], function() {
  gulp.src('./assets/js/*.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./assets/build/js'))

});

gulp.task('watch', function () {
  gulp.watch('./assets/js/*.js', ['scripts']);
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch(['./assets/build/js/*.js','./assets/css/style.css']).on('change', browserSync.reload)
});

gulp.task('lint', function () {
  return gulp.src(['./assets/js/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());

});

gulp.task('default', ['watch', 'browser-sync']);