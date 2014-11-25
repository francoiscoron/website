/*
$ sudo npm i -D gulp gulp-ruby-sass gulp-plumber gulp-image-optimization gulp-file-include gulp-connect gulp-rimraf gulp-ignore
*/
var gulp    = require('gulp'),
    scss    = require('gulp-ruby-sass'),
    plumber = require('gulp-plumber'),
    rimraf  = require('gulp-rimraf'),
    imageop = require('gulp-image-optimization'),
    jade    = require('gulp-jade'),
    uglify  = require('gulp-uglify'),
    concat  = require('gulp-concat'),
    connect = require('gulp-connect');

// Clean
gulp.task('clean', function() {
  return gulp.src('dist/', { read: false })
    .pipe(rimraf());
});


// Style
gulp.task('style', function(){
    return gulp.src('src/stylesheets/app.scss')
        .pipe(plumber())
        .pipe(scss({
            compass: true
        }))
        .pipe(gulp.dest('dist/css/'))
        .pipe(connect.reload());
});

// Images
gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(imageop({
            optimizationLevel: 5,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('dist/images/'))
        .pipe(connect.reload());
});

// Jade
gulp.task('jade', function(){
    return gulp.src('src/templates/pages/**/*.jade')
        .pipe(plumber())
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});

// Font
gulp.task('font', function() {
    return gulp.src('src/fonts/**')
        .pipe(plumber())
        .pipe(gulp.dest('dist/fonts/'))
        .pipe(connect.reload());
});

// Scripts
gulp.task('script', function(){
    return gulp.src(['src/scripts/libs/jquery.js', 'src/scripts/app.js'])
        .pipe(plumber())
        .pipe(uglify())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest('dist/js/'));
});

// Connect
gulp.task('connect', function() {
  connect.server({
    root: 'dist/',
    livereload: true
  });
});

// Build
gulp.task('build', ['clean','style','images', 'font', 'jade', 'script']);

// Watch
gulp.task('watch', ['build','connect'], function(){
    gulp.watch([
        'dist/**/*.html',
        'dist/style.css',
        'dist/images/**/*',
        'dist/js/app.min.js'
    ], function (event) {
            return gulp.src(event.path)
            .pipe(connect.reload());
        });
    gulp.watch('src/templates/**/*.jade', ['jade'])
    gulp.watch('src/scripts/**/*.js', ['script'])
    gulp.watch('src/stylesheets/**/*.scss', ['style'])
    gulp.watch('src/images/**/*', ['images'])
})