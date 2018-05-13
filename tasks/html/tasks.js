import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import { stream as critical } from 'critical';
import del from 'del';

gulp.task('clean:markup', ()=> del('dist/*.html'));

gulp.task('build:markup', ['clean:markup'], ()=> {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('watch:markup', ['build:markup'], ()=> gulp.watch('src/*.html', ['build:markup']));

function buildMarkupProduction() {
    return gulp.src('src/*.html')
        .pipe(critical({
            base: 'dist/',
            inline: true
        }))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true, // NOTE: This is safe to use with conditional comments
            minifyCSS: true
        }))
        .pipe(gulp.dest('dist'));
}

gulp.task('build:markup-production', ['clean:markup'], buildMarkupProduction);

export { buildMarkupProduction };
