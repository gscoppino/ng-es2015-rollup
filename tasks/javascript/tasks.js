import gulp from 'gulp';
import System from 'systemjs';
import path from 'path';
import del from 'del';
import webpack from 'webpack';
import pathconfig from './pathconfig.js';

function lazyLoadWebpackConfig (type) {
    System.config({
        map: {
            'path': '@node/path',
            'webpack': '@node/webpack',
            'sw-precache-webpack-plugin': '@node/sw-precache-webpack-plugin'
        }
    });

    if (type === 'dev') {
        return System.import('tasks/javascript/webpack.dev.js')
            .then(m => m.default);
    }
    if (type === 'production') {
        return System.import('tasks/javascript/webpack.production.js')
            .then(m => m.default);
    }

    return Promise.reject('Please specify one of "dev" or "production".');
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

gulp.task('build:js', ['clean:js'], (fin) => {
    lazyLoadWebpackConfig('dev').then((WEBPACK_DEV_CONFIG) => {

        webpack(WEBPACK_DEV_CONFIG).run((error) => {
            if (error) throw new Error('webpack', error);
            else fin();
        });

    });
});

gulp.task('watch:js', ['clean:js'], () => {
    return lazyLoadWebpackConfig('dev').then((WEBPACK_DEV_CONFIG) => {

        webpack(WEBPACK_DEV_CONFIG).watch({}, (error) => {
            if (error) throw new Error('webpack', error);
            else console.log('webpack rebundle complete.');
        });

    });
});

gulp.task('build:js-production', ['clean:js'], (fin) => {
    lazyLoadWebpackConfig('production').then((WEBPACK_PRODUCTION_CONFIG) => {

        return webpack(WEBPACK_PRODUCTION_CONFIG).run((error) => {
            if (error) throw new Error('webpack', error);
            else fin();
        });

    });
});