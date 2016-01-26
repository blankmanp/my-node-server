import gulp from 'gulp';
import babel from 'gulp-babel';
import config from '../config';
import less from 'gulp-less';
import cssmin from 'gulp-minify-css';

gulp.task('build', () => {
    gulp.src(`${config.js.src}*.js`)
        .pipe(babel())
        .pipe(gulp.dest(`${config.dest}`));
    gulp.start('build-less');
    gulp.start('webpack');
});

gulp.task('build-less', () => {
    gulp.src(`${config.css.src}*.less`)
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest(`${config.assets}`));
});
