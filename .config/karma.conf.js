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
                babel({
                    include: 'src/**',
                    exclude: 'node_modules/**'
                }),
                node_resolve({
                    jsnext: true,
                    main: true,
                    browser: true
                }),
                commonjs({
                    include: 'node_modules/**',
                    exclude: 'src/**'
                })
            ] 
        },
        bundle: {
            format: 'iife',
            sourceMap: 'inline'
        }
    }
  })
}
