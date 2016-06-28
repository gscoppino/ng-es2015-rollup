import gulp from 'gulp';
import del from 'del';
import fs from 'fs';
import { rollup } from 'rollup';
import ROLLUP_CONFIG from './rollup.config';
import ngAnnotate from 'ng-annotate';

gulp.task('clean:js', ()=> del([ROLLUP_CONFIG.bundle.dest, `${ROLLUP_CONFIG.bundle.dest}.map`]));

gulp.task('build:js', ['clean:js'], ()=> {
    return rollup(ROLLUP_CONFIG.rollup)
        .then((bundle)=> bundle.generate(ROLLUP_CONFIG.bundle))
        .then((output)=> {
            let final = ngAnnotate(output.code, {
                add: true,
                map: output.map
            });

            return Promise.all([
                new Promise((resolve)=> fs.writeFile(ROLLUP_CONFIG.bundle.dest, final.src, resolve)),
                new Promise((resolve)=> fs.writeFile(`${ROLLUP_CONFIG.bundle.dest}.map`, final.map, resolve))
            ]);
        });
});

gulp.task('watch:js', ['build:js'], ()=> gulp.watch(['src/**/!(*.spec).js', 'src/app/**/*.html'], ['build:js']));
