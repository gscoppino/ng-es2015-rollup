import ROLLUP_CONFIG from './rollup.config';

export default {
    frameworks: ['jasmine'],
    files: [
        'node_modules/babel-polyfill/dist/polyfill.min.js', // Polyfill ES2015 features
        'node_modules/angular/angular.js',
        'node_modules/angular-mocks/angular-mocks.js',
        'src/**/*.spec.ts'
    ],
    preprocessors: {
        'src/**/*.spec.ts': ['rollup', 'sourcemap']
    },
    rollupPreprocessor: ROLLUP_CONFIG,
    browsers: ['PhantomJS'],
    port: 9876,
    concurrency: Infinity,
    reporters: ['progress', 'coverage', 'karma-remap-istanbul'],
    coverageReporter: {
        dir: 'dist/coverage',
        reporters: [
            { type: 'text' },
            { type: 'json', subdir: '.', file: 'coverage.json' }
        ]
    },
    remapIstanbulReporter: {
        src: 'dist/coverage/coverage.json',
        reports: {
            html: 'dist/coverage/html'
        },
        timeoutNotCreated: 1000,
        timeoutNoMoreFiles: 1000
    },
    colors: true
};
