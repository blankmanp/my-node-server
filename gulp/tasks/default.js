import gulp from 'gulp';
import babel from 'gulp-babel';
import config from '../config';
import less from 'gulp-less';
import cssmin from 'gulp-minify-css';
import gulpEslint from 'gulp-eslint';
import lazyPipe from 'lazypipe';
import debug from 'gulp-debug';
import webpack from 'webpack';
import gutil from 'gulp-util';
import webpackConfig from '../webpack.config';
import friendlyFormatter from 'eslint-friendly-formatter';
import browserSync from 'browser-sync';

let bs = browserSync.create();

gulp.task('default', ['build', 'watch', 'lint'], () => {
    bs.init({
        server: {
            baseDir: './'
        }
    });
});

gulp.task('build', () => {
    gulp.src(`${config.js.src}*.js`)
        .pipe(babel())
        .pipe(gulp.dest(`${config.dest}`));
    gulp.src(`${config.css.src}*.less`)
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest(`${config.assets}`));
    gulp.start('webpack');
});

gulp.task('webpack', () => {
    webpack(webpackConfig, (err, stats) => {
        if (err) {
            return gutil.error(err);
        }
        gutil.log('webpack is done ~|0_0|~');
        bs.reload();
    });
});

gulp.task('watch', () => {
    gulp.watch([
        `${config.js.src}*.js`,
        `${config.js.src}*.jsx`,
        'gulp/tasks/*.js',
        `${config.css.src}*.less`
    ], ['build', 'lint']);
});

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
    return linter('?(app|config|src|gulp|lib|server)/**/*.js?(x)');
});

export default function linter(path) {
    return gulp.src(path).pipe(esLint());
}
