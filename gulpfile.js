// gulpfile.js

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const zip = require('gulp-zip');

// Завдання для збірки CSS для Debug
gulp.task('sass:debug', function () {
    return gulp.src('scss/**/*.scss') // Вказати шлях до ваших SASS файлів
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('css'));
});

// Завдання для збірки CSS для Production
gulp.task('sass:production', function () {
    return gulp.src('scss/**/*.scss') // Вказати шлях до ваших SASS файлів
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('css'));
});

// Завдання для стиснення зображень
gulp.task('images', function () {
    return gulp.src('images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

// Завдання для архівації файлів у debug.zip
gulp.task('archive:debug', function () {
    return gulp.src(['**/*', '!node_modules/**'])
        .pipe(zip('archive-debug.zip'))
        .pipe(gulp.dest('dist'));
});

// Завдання для архівації файлів у production.zip
gulp.task('archive:production', function () {
    return gulp.src(['**/*', '!node_modules/**'])
        .pipe(zip('archive-production.zip'))
        .pipe(gulp.dest('dist'));
});

// Завдання за замовчуванням для запуску
gulp.task('default', gulp.series('sass:debug', 'images', 'archive:debug'));
