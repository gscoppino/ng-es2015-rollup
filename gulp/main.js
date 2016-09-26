import gulp from 'gulp';

import './git/tasks';
import './build/html/tasks';
import './build/css/tasks';
import './build/js/tasks';
import './build/images/tasks';
import './build/docs/tasks';
import './test/tasks';
import './serve/tasks';
import './generate/tasks';

gulp.task('clean', ['clean:markup', 'clean:css', 'clean:js', 'clean:images',
                    'clean:docs', 'clean:test-coverage']);

gulp.task('build', ['build:markup', 'build:css', 'build:js', 'build:images']);

gulp.task('watch', ['watch:markup', 'watch:css', 'watch:js', 'watch:images',
                    'watch:git']);

gulp.task('develop', ['watch'], ()=> gulp.start('devserver'));

gulp.task('build-production', ['build:markup-production', 'build:css-production', 'build:js-production', 'build:images']);

gulp.task('production', ['build-production'], ()=> gulp.start('devserver'));
