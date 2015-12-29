var gulp = require("gulp");
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require("gulp-babel");

gulp.task('clean', function () {
    return gulp.src(['src/**/*-compiled.js', 'test/**/*-compiled.js'], { read: false })
        .pipe(clean());
});

gulp.task('compile', ['clean'], function () {
    return gulp.src('src/**/*.js')
        .pipe(babel())
        .pipe(rename({ suffix: '-compiled'}))
        .pipe(gulp.dest('src'));
});

gulp.task('build', ['compile'], function () {
    return gulp.src('src/**/*-compiled.js')
        .pipe(concat('aflowlib.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename({ suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('test', ['compile'], function () {
    return gulp.src('test/**/*.js')
        .pipe(babel())
        .pipe(rename({ suffix: '-compiled'}))
        .pipe(gulp.dest('test'));
});

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
