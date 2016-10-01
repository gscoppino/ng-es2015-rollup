import gulp from 'gulp';

import './git/tasks';
import './html/tasks';
import './css/tasks';
import './javascript/tasks';
import './images/tasks';
import './docs/tasks';
import './test/tasks';
import './serve/tasks';
import './generate/tasks';

gulp.task('clean', [
    'clean:markup',
    'clean:css',
    'clean:js',
    'clean:images',
    'clean:docs',
    'clean:test-coverage'
]);

gulp.task('build', [
    'build:markup',
    'build:css',
    'build:js',
    'build:images'
]);

gulp.task('watch', [
    'watch:markup',
    'watch:css',
    'watch:js',
    'watch:images',
    'watch:git'
]);

gulp.task('build-production', [
    'build:markup-production',
    'build:css-production',
    'build:js-production',
    'build:images'
]);

gulp.task('develop', ['watch'], ()=> gulp.start('devserver'));
gulp.task('production', ['build-production'], ()=> gulp.start('devserver'));
