import gulp from 'gulp';
import del from 'del';
import fs from 'fs';
import postcss from 'postcss';
import POSTCSS_DEV_CONFIG from './postcss.dev';
import POSTCSS_PRODUCTION_CONFIG from './postcss.production';

gulp.task('clean:css', ()=> del([POSTCSS_DEV_CONFIG.to, `${POSTCSS_DEV_CONFIG.to}.map`, POSTCSS_PRODUCTION_CONFIG.to]));

gulp.task('build:css', ['clean:css'], ()=> {
    return postcss(POSTCSS_DEV_CONFIG.plugins)
        .process(fs.readFileSync(POSTCSS_DEV_CONFIG.from), POSTCSS_DEV_CONFIG)
        .then((result)=> {
            return Promise.all([
                new Promise((resolve)=> fs.writeFile(POSTCSS_DEV_CONFIG.to, result.css, resolve)),
                new Promise((resolve)=> fs.writeFile(`${POSTCSS_DEV_CONFIG.to}.map`, result.map, resolve))
            ]);
        });
});

gulp.task('watch:css', ['build:css'], ()=> gulp.watch('src/**/*.css', ['build:css']));

gulp.task('build:css-production', ['clean:css'], ()=> {
    return postcss(POSTCSS_PRODUCTION_CONFIG.plugins)
        .process(fs.readFileSync(POSTCSS_PRODUCTION_CONFIG.from), POSTCSS_PRODUCTION_CONFIG)
        .then((result)=> {
            return Promise.all([
                new Promise((resolve)=> fs.writeFile(POSTCSS_PRODUCTION_CONFIG.to, result.css, resolve))
            ]);
        });
});
