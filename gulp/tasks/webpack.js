import gulp from 'gulp';
import webpack from 'webpack';
import gutil from 'gulp-util';
import webpackConfig from '../webpack.config';


gulp.task('webpack', () => {
    webpack(webpackConfig, (err, stats) => {
        if (err) {
            return gutil.error(err);
        }
        gutil.log('webpack is done ~|0_0|~');
    });
});
