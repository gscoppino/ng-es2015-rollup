import gulp from 'gulp';
import del from 'del';

gulp.task('clean:images', ()=> del(['dist/fallback/assets', 'dist/app/assets']));

gulp.task('build:images', ['clean:images'], () => {
    return gulp.src(['src/fallback/assets/**/*', 'src/app/assets/**/*'], { base: 'src' })
        .pipe(gulp.dest('dist'));
});

gulp.task('watch:images', ['build:images'], () =>
    gulp.watch(['src/fallback/assets/**', 'src/app/assets/**'], ['build:images']));
