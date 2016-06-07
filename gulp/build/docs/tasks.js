import gulp from 'gulp';
import del from 'del';
import jsdoc from 'gulp-jsdoc3';
import JSDOC_CONFIG from './jsdoc.config';

gulp.task('clean:docs', ()=> del('dist/documentation'));

gulp.task('build:docs', (done)=> {
    gulp.src('src/**/*.js', { read: false })
        .pipe(jsdoc(JSDOC_CONFIG, done));
});
