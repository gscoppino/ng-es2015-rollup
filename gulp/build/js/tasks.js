import gulp from 'gulp';
import del from 'del';
import path from 'path';
import Builder from 'systemjs-builder';

const builder = new Builder();
builder.loadConfig('src/system.config.js');

gulp.task('clean:js', ()=> del(['dist/main.js', 'dist/main.js.map']));

gulp.task('build:js', ['clean:js'], ()=> {
    return builder.buildStatic('src/main.js', 'dist/main.js', {
        sourceMaps: true
    });
});

gulp.task('watch:js', ['build:js'], ()=> gulp.watch(['src/**/!(*.spec).js', 'src/app/**/*.html'], ['build:js']));
