import gulp from 'gulp';
import babel from 'gulp-babel';
import config from '../config';

gulp.task('build', () => {
    gulp.src('app/*.js')
        .pipe(babel())
        .pipe(gulp.dest(`${config.dest}`));
    gulp.start('webpack');
});
