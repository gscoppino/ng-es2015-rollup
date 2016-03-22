import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import node_resolve from 'rollup-plugin-node-resolve';

import ROLLUP_CONFIG from './rollup.config';

export default {
    frameworks: ['jasmine'],
    files: [
        'node_modules/angular/angular.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'src/**/*.spec.js'
    ],
    preprocessors: {
        'src/**/*.spec.js': ['rollup', 'sourcemap']  
    },
    rollupPreprocessor: ROLLUP_CONFIG,
    browsers: ['PhantomJS'],
    port: 9876,
    concurrency: Infinity,
    reporters: ['progress'],
    colors: true
};
