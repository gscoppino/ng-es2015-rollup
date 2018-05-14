import gulp from 'gulp';
import path from 'path';
import del from 'del';
import webpack from 'webpack';

import pathconfig from './pathconfig.js';

function handleWebpackOutput(error, stats) {
    if (!error) {
        console.log('[webpack]', stats.toString({
            hash: false,
            version: false,
            timings: false,
            chunks: false
        }));

        return;
    }

    throw new Error('webpack', error);
}

gulp.task('clean:js', () => {
    return del([
        pathconfig.devBundle,
        `${pathconfig.devBundle}.map`,
        pathconfig.productionBundle,
        `${pathconfig.productionBundle}.map`,
        ...pathconfig.otherOutputs,
        ...pathconfig.otherOutputs.map(output => `${output}.map`)
    ]);
});

gulp.task('build:js', ['clean:js'], (callbackFn) => {
    import('./webpack.dev.js')
        .then(m => m.default)
        .then(config => {
            webpack(config).run((...output) => {
                handleWebpackOutput(...output);
                callbackFn();
            });
        });
});

gulp.task('watch:js', ['clean:js'], () => {
    import('./webpack.dev.js')
        .then(m => m.default)
        .then(config => {
            webpack(config).watch({}, (...output) => {
                handleWebpackOutput(...output);
                console.log('webpack rebundle complete.');
            });
        });
});

function buildJavascriptProduction(callbackFn) {
    import ('./webpack.production.js')
        .then(m => m.default)
        .then(config => {
            webpack(config).run((...output) => {
                handleWebpackOutput(...output);
                callbackFn();
            });
        });
}

gulp.task('build:js-production', ['clean:js'], buildJavascriptProduction);

export { buildJavascriptProduction };
