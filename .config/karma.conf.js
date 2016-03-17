const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const node_resolve = require('rollup-plugin-node-resolve');

module.exports = function(config) {
  config.set({

    basePath: '../',
    browsers: ['PhantomJS'],
    port: 9876,
    logLevel: config.LOG_INFO, // LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    colors: true,
    singleRun: true,
    autoWatch: false,
    concurrency: Infinity,
    
    files: [
        'node_modules/angular/angular.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'src/**/*.spec.js'
    ],
    
    frameworks: ['jasmine'],
    
    preprocessors: {
        'src/**/*.spec.js': ['rollup', 'sourcemap']
    },
    
    reporters: ['progress'],
    
    rollupPreprocessor: {
        rollup: {
            external: ['angular'], // Load Angular + Mocks via Karma instead to avoid angular-mocks multi-import bug.
            plugins: [
                // Transform ES2015 to ES5, sans module imports/exports
                babel({
                    include: 'src/**',
                    exclude: 'node_modules/**'
                }),
                // Resolve any non-relative module imports using NPM
                node_resolve({
                    jsnext: true,
                    main: true,
                    browser: true
                }),
                // Transform CommonJS modules from NPM into ES2015 modules, suitable for bundling via rollup
                commonjs({
                    include: 'node_modules/**',
                    exclude: 'src/**'
                })
            ] 
        },
        bundle: {
            format: 'iife', // Transpiled ES5 exported as a global module.
            sourceMap: 'inline' // For use by Karma in stack traces and code coverage
        }
    }
  })
}
