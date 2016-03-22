import gulp from 'gulp';

import './gulp/build/html/tasks';
import './gulp/build/css/tasks';
import './gulp/build/js/tasks';
import './gulp/test/tasks';
import './gulp/serve/tasks';

gulp.task('build', ['build:markup', 'build:css', 'build:js']);
gulp.task('watch', ['watch:markup', 'watch:css', 'watch:js']);
gulp.task('develop', ['watch', 'devserver']);