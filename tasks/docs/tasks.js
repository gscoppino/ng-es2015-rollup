import gulp from 'gulp';
import del from 'del';

gulp.task('clean:docs', ()=> del('dist/documentation'));

// build:docs actually exists as an npm script called 'documentation'. It may be moved
// a gulp task at a later point.
