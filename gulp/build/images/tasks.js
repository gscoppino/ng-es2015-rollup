import gulp from 'gulp';
import del from 'del';

gulp.task('clean:images', ()=> del('dist/assets'));

gulp.task('build:images', ['clean:images'], () => {
    return gulp.src('src/assets/**/*', { base: 'src' })
        .pipe(gulp.dest('dist'));
});

gulp.task('watch:images', () => gulp.watch('src/assets/**', ['build:images']));
