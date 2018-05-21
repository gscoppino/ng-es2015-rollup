const puppeteer = require('puppeteer');

module.exports = {
    config: {
        framework: 'jasmine',
        specs: ['../../src/**/*.e2e.js'],
        directConnect: true,
        capabilities: {
			browserName: 'chrome',
			chromeOptions: {
				binary: process.env.HEADLESS ? puppeteer.executablePath() : undefined,
				args: process.env.HEADLESS ? ['--headless'] : []
			}
        },
        baseUrl: 'http://localhost:3000'
    }
};