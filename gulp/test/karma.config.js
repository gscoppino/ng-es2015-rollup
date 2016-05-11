import ROLLUP_CONFIG from './rollup.config';

export default {
    frameworks: ['jasmine'],
    files: [
        'node_modules/babel-polyfill/dist/polyfill.min.js', // Polyfill ES2015 features
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
    reporters: ['progress', 'coverage'],
    coverageReporter: {
        dir: 'dist/coverage',
        reporters: [
            { type: 'text' },
            { type: 'html', subdir: 'html' }
        ]
    },
    colors: true
};
