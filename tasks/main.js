import gulp from 'gulp';
import System from 'systemjs';

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
import { buildJsProduction } from './javascript/tasks.js';
import { startDevServer } from './serve/tasks.js';

System.config({
    transpiler: 'plugin-babel',
    map: {
        'plugin-babel': 'node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': 'node_modules/systemjs-plugin-babel/systemjs-babel-node.js'
    },
    meta: {
        'tasks/**/*.js':        { loader: 'plugin-babel', babelOptions: { es2015: true,  stage1: false, stage2: false, stage3: false } },
        'node_modules/**/*.js': { loader: 'plugin-babel', babelOptions: { es2015: false, stage1: false, stage2: false, stage3: false } }
    }
});

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
    'build:css-production',
    'build:images'
], (fin) => {
    // Production CSS is built before the markup, in
    // order for the critical CSS to be included in the final
    // markup.
    buildMarkupProduction().on('end', () => {
        // Production markup and CSS are both built
        // before Javascript, in order for those assets to be
        // pre-cached by the service worker.
        buildJsProduction(fin);
    });
});

gulp.task('develop', ['watch'], startDevServer);
gulp.task('production', ['build-production'], startDevServer);
