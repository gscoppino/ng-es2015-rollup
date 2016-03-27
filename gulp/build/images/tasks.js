import gulp from 'gulp';

gulp.task('build:images', () => {
    return gulp.src('src/assets/**/*', { base: 'src' })
        .pipe(gulp.dest('dist'));
});

gulp.task('watch:images', () => gulp.watch('src/assets/**', ['build:images']));