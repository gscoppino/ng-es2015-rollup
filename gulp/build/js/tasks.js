import gulp from 'gulp';
import del from 'del';
import { rollup } from 'rollup';
import ROLLUP_CONFIG from './rollup.config';

gulp.task('clean:js', ()=> del([ROLLUP_CONFIG.bundle.dest, `${ROLLUP_CONFIG.bundle.dest}.map`]));

gulp.task('build:js', ['clean:js'], ()=> {
    return rollup(ROLLUP_CONFIG.rollup)
        .then((bundle)=> bundle.write(ROLLUP_CONFIG.bundle));
});

gulp.task('watch:js', ()=> gulp.watch('src/**/!(*.spec).js', ['build:js']));
