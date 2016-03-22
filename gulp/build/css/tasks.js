import gulp from 'gulp';
import fs from 'fs';
import postcss from 'postcss';
import POSTCSS_CONFIG from './postcss.config';

gulp.task('build:css', ()=> {
    return postcss(POSTCSS_CONFIG.plugins)
        .process(fs.readFileSync(POSTCSS_CONFIG.from), POSTCSS_CONFIG)
        .then((result)=> {
            return Promise.all([
                new Promise((resolve)=> fs.writeFile(POSTCSS_CONFIG.to, result.css, resolve)),
                new Promise((resolve)=> fs.writeFile(`${POSTCSS_CONFIG.to}.map`, result.map, resolve))
            ]);
        });
});

gulp.task('watch:css', ()=> gulp.watch('src/**/*.css', ['build:css']));