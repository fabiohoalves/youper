var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var typescript = require('gulp-tsc');

var paths = {
  sass: ['./scss/**/*.scss'],
  src: ['./src/*.ts']
};

gulp.task('default', ['sass']);

gulp.task('compile', function(){
  gulp.src(paths.src)
  .pipe(typescript({
     emitError: false
  }))
  .pipe(gulp.dest('www/js/'))

});

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(cleanCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.src, ['compile']);
});
