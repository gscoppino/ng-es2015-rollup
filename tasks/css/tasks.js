import gulp from 'gulp';
import fs from 'fs';
import del from 'del';
import postcss from 'postcss';

import pathconfig from './pathconfig.js';

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
    return import('./postcss.dev.js')
        .then(m => m.default)
        .then(config => {
            return postcss(config.plugins)
                .process(fs.readFileSync(pathconfig.entry), config)
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
    return import('./postcss.production.js')
        .then(m => m.default)
        .then(config => {
            return postcss(config.plugins)
                .process(fs.readFileSync(pathconfig.entry), config)
                .then((result)=> {
                    return Promise.all([
                        new Promise((resolve) => fs.writeFile(pathconfig.productionBundle, result.css, resolve))
                    ]);
                });
        });
});
