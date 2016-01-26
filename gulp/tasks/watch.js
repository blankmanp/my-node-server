/*
* @Author: pengyanxin
* @Date:   2016-01-15 16:06:52
* @Last Modified by:   blankmanp
* @Last Modified time: 2016-01-26 11:59:12
*/
import gulp from 'gulp';
import config from '../config';

gulp.task('watch', () => {
    gulp.watch([
        `${config.js.src}*.js`,
        `${config.js.src}*.jsx`,
        'gulp/tasks/*.js',
        `${config.css.src}*.less`
    ], ['build', 'lint']);
});
