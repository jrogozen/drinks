var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var wiredep = require('wiredep').stream;
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');

// lint
gulp.task('lint', function() {
  return gulp.src(['client/app/*.js', 'client/app/**/*.js', 'client/components/**/*.js'])
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// compile scss
gulp.task('sass', function() {
  return gulp.src('client/scss/*.scss')
    .pipe(plumber({
        errorHandler: onError
      }))
    .pipe(sass())
    .pipe(gulp.dest('client/css'));
});

// concat + minify js
gulp.task('scripts', function() {
  return gulp.src(['client/app/*.js', 'client/app/**/*.js', 'client/components/**/*.js'])
    .pipe(plumber({
    errorHandler: onError
    })) 
    .pipe(concat('all.js'))
    .pipe(gulp.dest('client/dist'))
    .pipe(rename('all.min.js'))
    .pipe(uglify({
      mangle: false
    }))
    .pipe(gulp.dest('client/dist'));
})

// inject dependencies
gulp.task('bower-install', function() {
  gulp.src('./client/index.html')
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(wiredep({
    }))
    .pipe(gulp.dest('./client'));
});

// start webserver (not api)
gulp.task('webserver', function() {
  nodemon({ script: 'server/app.js', ext: 'html js' })
    .on('restart', function() {
      console.log('restarted!');
    })
});

// watch for changes
gulp.task('watch', function() {
  gulp.watch(['client/app/*.js', 'client/app/**/*.js', 'client/components/**/*.js'], ['lint', 'scripts']);
});

gulp.task('default', ['lint', 'scripts', 'bower-install', 'sass', 'webserver', 'watch']);

function onError(err) {
  gutil.beep();
  gutil.log('error ', gutil.colors.cyan(err));
}