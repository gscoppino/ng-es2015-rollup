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

import { buildJsProduction } from './javascript/tasks.js';
import { startDevServer } from './serve/tasks.js';

System.config({
    map: {
        'babel': 'node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': 'node_modules/systemjs-plugin-babel/systemjs-babel-node.js'
    },
    meta: {
        'tasks/**/*.js': { loader: 'babel' }
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
    'build:markup-production',
    'build:css-production',
    'build:images'
], buildJsProduction);

gulp.task('develop', ['watch'], startDevServer);
gulp.task('production', ['build-production'], startDevServer);
