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

const HTMLMIN_OPTIONS = {
    collapseWhitespace: true,
    removeComments: true, // NOTE: This is safe to use with conditional comments
    minifyCSS: true
};

function buildFallbackPageProduction() {
    return gulp.src('src/fallback.html')
        .pipe(htmlmin(HTMLMIN_OPTIONS))
        .pipe(gulp.dest('dist'));
}

gulp.task('build:markup-production-phase1', ['clean:markup'], buildFallbackPageProduction);

function buildMainPageProduction() {
    return gulp.src('src/index.html')
        .pipe(critical({
            base: 'dist/',
            inline: true
        }))
        .pipe(htmlmin(HTMLMIN_OPTIONS))
        .pipe(gulp.dest('dist'));
}

gulp.task('build:markup-production', ['build:markup-production-phase1'], buildMainPageProduction);

export { buildMainPageProduction };
