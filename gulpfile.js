var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    browserify = require('gulp-browserify'),
    nodemon = require('gulp-nodemon'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    replace = require('gulp-replace');

gulp.task('replaceJsSrc', function () {
    gulp.src(['views/includes/footer.jade'])
        .pipe(replace(/js\?\d*/g, 'js?' + (new Date()).getTime()))
        .pipe(gulp.dest('views/includes/'));
});

gulp.task('replaceCssSrc', function () {
    gulp.src(['views/includes/head.jade'])
        .pipe(replace(/css\?\d*/g, 'css?' + (new Date()).getTime()))
        .pipe(gulp.dest('views/includes/'));
});

gulp.task('less', function () {
    return gulp.src('client/css/less/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('client/css'));
});

gulp.task('styles', function () {
    return gulp.src('client/css/*.css')
        .pipe(concat('/export/main.css'))
        .pipe(gulp.dest('client/css/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('client/css/'));
});

gulp.task('browserify', function () {
    gulp.src(['client/js/pages/*.js'])
        .pipe(browserify({
            insertGlobals: false,
            debug: false
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify({mangle: true}))
        .pipe(gulp.dest('client/js/export/'));
});

gulp.task('clean', function (cb) {
    del(['client/css/export/main.css', 'client/css/export/main.min.css', 'client/js/export/*.min.js'], cb);
});

gulp.task('watch', function () {
    gulp.watch('client/css/less/*.less', ['less']);
    gulp.watch('client/css/*.css', ['styles']);
    gulp.watch(['client/js/component/*.js', 'client/js/lib/**/*.js', 'client/js/pages/*.js', 'client/js/tpl/*.js'], ['browserify']);
    livereload.listen();
    gulp.watch(['client/**']).on('change', livereload.changed);
});

gulp.task('default', ['clean', 'styles', 'browserify', 'watch', 'replaceJsSrc', 'replaceCssSrc']);

gulp.task('serve', ['watch'], function () {
    return nodemon({
        script: 'app.js',
        ignore: [
            "client/**",
            "views/**"
        ],
        env: {
            "NODE_ENV": "develop"
        }
    });
});

gulp.task('develop', ['watch', 'serve']);
