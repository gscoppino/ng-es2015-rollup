import gulp from 'gulp';

import './gulp/build/html/tasks';
import './gulp/build/css/tasks';
import './gulp/build/js/tasks';
import './gulp/build/images/tasks';
import './gulp/test/tasks';
import './gulp/serve/tasks';

gulp.task('build', ['build:markup', 'build:css', 'build:js', 'build:images']);
gulp.task('watch', ['watch:markup', 'watch:css', 'watch:js', 'watch:images']);
gulp.task('develop', ['watch', 'devserver']);