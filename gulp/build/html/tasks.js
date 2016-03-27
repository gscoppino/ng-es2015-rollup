import gulp from 'gulp';

gulp.task('build:markup', ()=> {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('watch:markup', ()=> gulp.watch('src/*.html', ['build:markup']));