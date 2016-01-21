import gulp from 'gulp';
import babel from 'gulp-babel';
import config from '../config';
import browserSync from 'browser-sync';

let bs = browserSync.create();
gulp.task('default', ['build', 'watch', 'lint'], () => {
    bs.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('assets/*').on('change', bs.reload);
});
