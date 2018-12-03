var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
var minScss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

gulp.task('devScss', function() {
    return gulp.src('./src/sass/*.scss')
        .pipe(sass())
        .pipe(minScss())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('devJs', function() {
    return gulp.src('./src/js/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./src/lib'))
})

gulp.task('watch', function() {
    return gulp.watch('./src/', gulp.series('devScss', 'devJs'))
})

gulp.task('server', function() {
    return gulp.src('./src/')
        .pipe(server({
            port: 9999,
            livereload: true
        }))
})
gulp.task('default', gulp.series('devScss', 'devJs', 'server', 'watch'))