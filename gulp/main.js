import gulp from 'gulp';

import './git/tasks.js';
import './html/tasks.js';
import './css/tasks.js';
import './javascript/tasks.js';
import './images/tasks.js';
import './docs/tasks.js';
import './test/tasks.js';
import './serve/tasks.js';
import './generate/tasks.js';

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
