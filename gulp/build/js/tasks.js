import gulp from 'gulp';
import path from 'path';
import del from 'del';
import webpack from 'webpack';
import System from 'systemjs';
import pathconfig from './pathconfig.js';

function lazyLoadWebpackConfig (type) {
    System.config({
        map: {
            'path': '@node/path',
            'webpack': '@node/webpack'
        }
    });

    if (type === 'dev') {
        return System.import('gulp/build/js/webpack.dev.js')
            .then(m => m.default);
    }
    if (type === 'production') {
        return System.import('gulp/build/js/webpack.production.js')
            .then(m => m.default);
    }
}

gulp.task('clean:js', ()=> {
    return del([
        pathconfig.out.devPath,
        pathconfig.map.path,
        pathconfig.out.prodPath
    ]);
});

gulp.task('build:js', ['clean:js'], (fin)=> {
    lazyLoadWebpackConfig('dev').then((WEBPACK_DEV_CONFIG) => {
        webpack(WEBPACK_DEV_CONFIG).run((error)=> {
            if (error) throw new Error('webpack', error);
            else fin();
        });
    });
});

gulp.task('watch:js', ['clean:js'], ()=> {
    return lazyLoadWebpackConfig('dev').then((WEBPACK_DEV_CONFIG) => {
        webpack(WEBPACK_DEV_CONFIG).watch({}, (error)=> {
            if (error) throw new Error('webpack', error);
            else console.log('webpack rebundle complete.');
        });
    });
});

gulp.task('build:js-production', ['clean:js'], (fin)=> {
    lazyLoadWebpackConfig('production').then((WEBPACK_PRODUCTION_CONFIG) => {
        return webpack(WEBPACK_PRODUCTION_CONFIG).run((error)=> {
            if (error) throw new Error('webpack', error);
            else fin();
        });
    });
});
