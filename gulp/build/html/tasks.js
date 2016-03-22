import gulp from 'gulp';

gulp.task('build:markup', ()=> {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('watch:markup', ()=> gulp.watch('src/index.html', ['build:markup']));