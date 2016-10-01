import gulp from 'gulp';
import del from 'del';
import fs from 'fs';
import postcss from 'postcss';
import System from 'systemjs';
import pathconfig from './pathconfig.js';

function lazyLoadPostcssConfig (type) {
    System.config({
        map: {
            'stylelint': '@node/stylelint',
            'postcss-reporter': '@node/postcss-reporter',
            'postcss-import': '@node/postcss-import',
            'postcss-cssnext': '@node/postcss-cssnext',
            'cssnano': '@node/cssnano'
        }
    });

    if (type === 'dev') {
        return System.import('gulp/build/css/postcss.dev.js')
            .then(m => m.default);
    }

    if (type === 'production') {
        return System.import('gulp/build/css/postcss.production.js')
            .then(m => m.default);
    }
}

gulp.task('clean:css', ()=> {
    return del([
        pathconfig.out.devPath,
        pathconfig.out.prodPath,
        pathconfig.map.path
    ]);
});

gulp.task('build:css', ['clean:css'], ()=> {
    return lazyLoadPostcssConfig('dev').then((POSTCSS_DEV_CONFIG) => {
        return postcss(POSTCSS_DEV_CONFIG.plugins)
            .process(fs.readFileSync(pathconfig.in.path), POSTCSS_DEV_CONFIG)
            .then((result)=> {
                return Promise.all([
                    new Promise((resolve)=> fs.writeFile(pathconfig.out.devPath, result.css, resolve)),
                    new Promise((resolve)=> fs.writeFile(pathconfig.map.path, result.map, resolve))
                ]);
            });
    });
});

gulp.task('watch:css', ['build:css'], ()=> gulp.watch('src/**/*.css', ['build:css']));

gulp.task('build:css-production', ['clean:css'], ()=> {
    return lazyLoadPostcssConfig('production').then((POSTCSS_PRODUCTION_CONFIG) => {
        return postcss(POSTCSS_PRODUCTION_CONFIG.plugins)
            .process(fs.readFileSync(pathconfig.in.path), POSTCSS_PRODUCTION_CONFIG)
            .then((result)=> {
                return Promise.all([
                    new Promise((resolve)=> fs.writeFile(pathconfig.out.prodPath, result.css, resolve))
                ]);
            });
    });
});
