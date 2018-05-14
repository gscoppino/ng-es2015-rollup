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
import { buildMarkupProduction } from './html/tasks.js';
import { buildJavascriptProduction } from './javascript/tasks.js';
import { startDevServer } from './serve/tasks.js';

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
    'clean:markup',
    'build:css-production',
    'clean:js',
    'build:images'
], (callbackFn) => {
    // Production CSS is built before the markup, in
    // order for the critical CSS to be included in the final
    // markup.
    buildMarkupProduction().on('end', () => {
        // Production markup and CSS are both built
        // before Javascript, in order for those assets to be
        // pre-cached by the service worker.
        buildJavascriptProduction(callbackFn);
    });
});

gulp.task('develop', ['watch'], startDevServer);
gulp.task('production', ['build-production'], startDevServer);
