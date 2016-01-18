/*
* @Author: pengyanxin
* @Date:   2016-01-15 16:06:52
* @Last Modified by:   pengyanxin
* @Last Modified time: 2016-01-16 12:06:53
*/
import gulp from 'gulp';
import config from '../config';

gulp.task('watch', () => {
    gulp.watch([`${config.src}*.js`, `${config.src}*.jsx`, 'gulp/tasks/*.js'], ['build', 'lint']);
});
