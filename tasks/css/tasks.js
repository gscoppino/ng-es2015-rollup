import gulp from 'gulp';
import System from 'systemjs';
import fs from 'fs';
import del from 'del';
import postcss from 'postcss';
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
        return System.import('tasks/css/postcss.dev.js')
            .then(m => m.default);
    }

    if (type === 'production') {
        return System.import('tasks/css/postcss.production.js')
            .then(m => m.default);
    }

    return Promise.reject('Please specify one of "dev" or "production".');
}

gulp.task('clean:css', () => {
    return del([
        pathconfig.devBundle,
        `${pathconfig.devBundle}.map`,
        pathconfig.productionBundle,
        `${pathconfig.productionBundle}.map`,
        ...pathconfig.otherOutputs,
        ...pathconfig.otherOutputs.map(output => `${output}.map`)
    ]);
});

gulp.task('build:css', ['clean:css'], () => {
    return lazyLoadPostcssConfig('dev').then((POSTCSS_DEV_CONFIG) => {

        return postcss(POSTCSS_DEV_CONFIG.plugins)
            .process(fs.readFileSync(pathconfig.entry), POSTCSS_DEV_CONFIG)
            .then((result)=> {
                return Promise.all([
                    new Promise((resolve) => fs.writeFile(pathconfig.devBundle, result.css, resolve)),
                    new Promise((resolve) => fs.writeFile(`${pathconfig.devBundle}.map`, result.map, resolve))
                ]);
            });

    });
});

gulp.task('watch:css', ['build:css'], () => gulp.watch('src/**/*.css', ['build:css']));

gulp.task('build:css-production', ['clean:css'], () => {
    return lazyLoadPostcssConfig('production').then((POSTCSS_PRODUCTION_CONFIG) => {

        return postcss(POSTCSS_PRODUCTION_CONFIG.plugins)
            .process(fs.readFileSync(pathconfig.entry), POSTCSS_PRODUCTION_CONFIG)
            .then((result)=> {
                return Promise.all([
                    new Promise((resolve) => fs.writeFile(pathconfig.productionBundle, result.css, resolve))
                ]);
            });

    });
});
