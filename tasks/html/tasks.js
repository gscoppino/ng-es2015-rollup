import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import del from 'del';

gulp.task('clean:markup', ()=> del('dist/*.html'));

gulp.task('build:markup', ['clean:markup'], ()=> {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('watch:markup', ['build:markup'], ()=> gulp.watch('src/*.html', ['build:markup']));

gulp.task('build:markup-production', ['clean:markup'], ()=> {
    return gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true, // NOTE: This is safe to use with conditional comments,
            minifyCSS: true
        }))
        .pipe(gulp.dest('dist'));
});
