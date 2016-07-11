import gulp from 'gulp';

import './git/tasks';
import './build/html/tasks';
import './build/css/tasks';
import './build/js/tasks';
import './build/images/tasks';
import './test/tasks';
import './serve/tasks';

gulp.task('clean', ['clean:markup', 'clean:css', 'clean:js', 'clean:images']);

gulp.task('build', ['build:markup', 'build:css', 'build:js', 'build:images']);

gulp.task('watch', ['watch:markup', 'watch:css', 'watch:js', 'watch:images',
                    'watch:git']);

gulp.task('develop', ['watch'], ()=> gulp.start('devserver'));
