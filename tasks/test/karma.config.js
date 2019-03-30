import puppeteer from 'puppeteer';
import WEBPACK_TESTING_CONFIG from './webpack.testing.js';

// https://github.com/karma-runner/karma-chrome-launcher#headless-chromium-with-puppeteer
process.env.CHROME_BIN = puppeteer.executablePath();

export default {
    frameworks: ['jasmine'],
    files: [
        'src/main.spec.js'
    ],
    preprocessors: {
        'src/main.spec.js': ['webpack', 'sourcemap']
    },
    webpack: WEBPACK_TESTING_CONFIG,
    browsers: ['ChromeHeadless'],
    port: 9876,
    concurrency: Infinity,
    reporters: ['progress', 'coverage'],
    coverageReporter: {
        dir: 'dist/coverage',
        reporters: [
            { type: 'text' },
            { type: 'html', subdir: 'html' },
            { type: 'lcovonly', subdir: 'lcov' }
        ]
    },
    colors: true
};
