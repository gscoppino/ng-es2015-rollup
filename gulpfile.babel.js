import gulp from 'gulp';
import gutil from 'gulp-util';
import fs from 'fs';

import { rollup } from 'rollup';
import ROLLUP_CONFIG from './.config/rollup.config';

import postcss from 'postcss';
import POSTCSS_CONFIG from './.config/postcss.config';

import browserSync from 'browser-sync';

let server;
if (process.argv[2] !== 'develop') 
    server = { reload: noop=>{}, stream: gutil.noop };
else
    server = browserSync.create();

gulp.task('build:markup', ()=> {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'))
        .pipe(server.stream());
});

gulp.task('build:css', ()=> {
    return postcss(POSTCSS_CONFIG.plugins)
        .process(fs.readFileSync(POSTCSS_CONFIG.from), POSTCSS_CONFIG)
        .then((result)=> {
            return Promise.all([
                new Promise((resolve)=> {
                    fs.writeFile(POSTCSS_CONFIG.to, result.css, resolve);              
                }),
                new Promise((resolve) => {
                    fs.writeFile(POSTCSS_CONFIG.to + '.map', result.map, resolve);                    
                })
            ]);
        })
        .then(server.reload);
});

gulp.task('build:js', ()=> {
    return rollup(ROLLUP_CONFIG.rollup)
        .then((bundle)=> {
            return bundle.write(ROLLUP_CONFIG.bundle);
        })
        .then(server.reload);
});

gulp.task('watch:markup', ()=> { return gulp.watch('src/index.html', ['build:markup']) });
gulp.task('watch:css', ()=> { return gulp.watch('src/**/*.css', ['build:css']) });
gulp.task('watch:js', ()=> { return gulp.watch('src/**/!(*.spec).js', ['build:js']) });

gulp.task('serve', ()=> {
    server.init({
        server: {
            baseDir: 'dist'
        }
    });
});

gulp.task('build', ['build:markup', 'build:css', 'build:js']);
gulp.task('watch', ['watch:markup', 'watch:css', 'watch:js']);
gulp.task('develop', ['watch', 'serve']);