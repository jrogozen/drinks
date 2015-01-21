var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var wiredep = require('wiredep').stream;

// lint
gulp.task('lint', function() {
  return gulp.src(['client/app/*.js', 'client/app/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// compile scss
gulp.task('sass', function() {
  return gulp.src('client/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('client/css'));
});

// concat + minify js
gulp.task('scripts', function() {
  return gulp.src(['client/app/*.js', 'client/app/**/*.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('client/dist'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('client/dist'));
})

// inject dependencies
gulp.task('bower-install', function() {
  gulp.src('./client/index.html')
    .pipe(wiredep({
    }))
    .pipe(gulp.dest('./client'));
});

// watch for changes
gulp.task('watch', function() {
  gulp.watch(['client/app/*.js', 'client/app/**/*.js'], ['lint', 'scripts']);
});

gulp.task('default', ['lint', 'scripts', 'bower-install', 'sass', 'watch']);