/*
* @Author: pengyanxin
* @Date:   2016-01-15 16:54:01
* @Last Modified by:   pengyanxin
* @Last Modified time: 2016-01-15 18:14:16
*/

import gulp from 'gulp';
import gulpEslint from 'gulp-eslint';
import lazyPipe from 'lazypipe';
import debug from 'gulp-debug';
import friendlyFormatter from 'eslint-friendly-formatter';

const esLint = lazyPipe()
    .pipe(gulpEslint)
    .pipe(() => {
        return debug({ title: 'lint: ' });
    })
    .pipe(() => {
        return gulpEslint.format(friendlyFormatter);
    })
    .pipe(() => {
        return gulpEslint.failAfterError('eslint-path-format');
    });
gulp.task('lint', () => {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return linter('?(app|config|gulp|lib|server)/**/*.js?(x)');
});

export default function linter(path) {
    // eslint() attaches the lint output to the "eslint" property
    // of the file object so it can be used by other modules.
    return gulp.src(path).pipe(esLint());
}
