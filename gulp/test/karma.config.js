export default {
    frameworks: ['systemjs', 'jasmine'],
    files: [
        'src/**/*.spec.js'
    ],
    preprocessors: {
        'src/**/*.spec.js': ['sourcemap']
    },
    systemjs: {
        configFile: 'src/system.config.js',
        config: {
            transpiler: false,
            map: {
                // SystemJS
                'systemjs': 'node_modules/systemjs/dist/system.js',

                // Extra External Dependencies
                'angular-mocks': 'node_modules/angular-mocks/ngMock.js'
            }
        },
        includeFiles: [
            //'node_modules/babel-polyfill/dist/polyfill.min.js'
        ],
        serveFiles: [
            { pattern: './node_modules/**/*.js', included: false, served: true, watched: false },
            'src/**/!(*.spec).js'
        ]
    },
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
