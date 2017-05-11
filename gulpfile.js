// dev Dependencies [
//     "browser-sync": "^2.18.8",
//     "gulp": "^3.9.1",
//     "gulp-autoprefixer": "^3.1.1",
//     "gulp-cssnano": "^2.1.2",
//     "gulp-eslint": "^3.0.1",
//     "gulp-prettyerror": "^1.2.1",
//     "gulp-rename": "^1.2.2",
//     "gulp-sass": "^3.1.0",
//     "gulp-uglify": "^2.1.2",
// ]


var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync'),
    eslint = require('gulp-eslint'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    prettyerror = require('gulp-prettyerror');


gulp.task('sass', function () {
  gulp.src('./scss/style.scss')
    .pipe(prettyerror())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(cssnano())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./build/css'))
});

gulp.task('scripts', ['lint'], function() {
  gulp.src('./js/*.js')
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('./build/js'))

});

gulp.task('watch', function () {
  gulp.watch('./js/*.js', ['scripts']);
  gulp.watch('./scss/*.scss', ['sass']);
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch(['./build/js/*.js','./build/css/*.css']).on('change', browserSync.reload)
});

gulp.task('lint', function () {
  return gulp.src(['./js/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());

});

gulp.task('default', ['watch', 'browser-sync']);