import gulp from 'gulp';
import del from 'del';
import { rollup } from 'rollup';
import ROLLUP_DEV_CONFIG from './rollup.dev';
import ROLLUP_PRODUCTION_CONFIG from './rollup.production';

gulp.task('clean:js', ()=> del([ROLLUP_DEV_CONFIG.bundle.dest, `${ROLLUP_DEV_CONFIG.bundle.dest}.map`, ROLLUP_PRODUCTION_CONFIG.bundle.dest]));

gulp.task('build:js', ['clean:js'], ()=> {
    return rollup(ROLLUP_DEV_CONFIG.rollup)
        .then((bundle)=> bundle.write(ROLLUP_DEV_CONFIG.bundle));
});

gulp.task('watch:js', ['build:js'], ()=> gulp.watch(['src/**/!(*.spec).js', 'src/app/**/*.html'], ['build:js']));


gulp.task('build:js-production', ['clean:js'], ()=> {
    return rollup(ROLLUP_PRODUCTION_CONFIG.rollup)
        .then((bundle)=> bundle.write(ROLLUP_PRODUCTION_CONFIG.bundle));
});
