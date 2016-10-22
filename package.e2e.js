var fs = require('fs');
var path = require('path');
var child_process = require('child_process');

describe('ng-es2015-webpack', () => {
    var DEV_ARTIFACTS = [
        'dist/fallback.html',
        'dist/index.html',
        'dist/main.css',
        'dist/main.css.map',
        'dist/main.js',
        'dist/main.js.map',
        'dist/sw.js',
        'dist/sw.js.map'
    ];

    var PROD_ARTIFACTS = [
        'dist/fallback.html',
        'dist/index.html',
        'dist/main.css',
        'dist/main.js',
        'dist/sw.js'
    ];

    var NPM = /^win/.test(process.platform) ? 'npm.cmd' : 'npm';

    beforeEach(() => {
        rm_rf('dist');
    });

    afterAll(() => {
        rm_rf('dist');
    });

    describe('clean', () => {
        it('should remove dev build artifacts created by "npm run build".', () => {
            fs.mkdirSync('dist');
            fs.mkdirSync('dist/fallback');
            DEV_ARTIFACTS.forEach(function (artifact) {
                fs.writeFileSync(artifact, '');
            });

            expect(child_process.spawnSync(NPM, ['run', 'clean']).status)
                .toBe(0);

            DEV_ARTIFACTS.forEach(function (artifact) {
                expect(fs.existsSync(artifact)).toBe(false);
            });
        });

        it('should remove production build artifacts created by "npm run build-production".', () => {
            fs.mkdirSync('dist');
            fs.mkdirSync('dist/fallback');
            PROD_ARTIFACTS.forEach(function (artifact) {
                fs.writeFileSync(artifact, '');
            });

            expect(child_process.spawnSync(NPM, ['run', 'clean']).status)
                .toBe(0);

            PROD_ARTIFACTS.forEach(function (artifact) {
                expect(fs.existsSync(artifact)).toBe(false);
            });
        });
    });

    describe('build', () => {
        it('should create the correct build artifacts in the dist folder.', () => {
            expect(child_process.spawnSync(NPM, ['run', 'build']).status)
                .toBe(0);

            DEV_ARTIFACTS.concat([
                'dist',
                'dist/fallback'
            ]).forEach(function (artifact) {
                expect(fs.existsSync(artifact)).toBe(true);
            });
        });
    });

    describe('build-production', () => {
        it('should create the correct build artifacts in the dist folder.', () => {
            expect(child_process.spawnSync(NPM, ['run', 'build-production']).status)
                .toBe(0);

            PROD_ARTIFACTS.concat([
                'dist',
                'dist/fallback'
            ]).forEach(function (artifact) {
                expect(fs.existsSync(artifact)).toBe(true);
            });
        });
    });

    describe('test-unit', () => {
        it('should run the unit tests for the source code, and output HTML coverage info.', () => {
            expect(child_process.spawnSync(NPM, ['run', 'test-unit']).status)
                .toBe(0);

            expect(fs.existsSync('dist/coverage')).toBe(true);
            expect(fs.existsSync('dist/coverage/html')).toBe(true);
            expect(fs.existsSync('dist/coverage/html/index.html')).toBe(true);
        });
    });

    describe('doc-generator', () => {
        it('should generate docs for the source code.', () => {
            expect(child_process.spawnSync(NPM, ['run', 'doc-generator']).status)
                .toBe(0);

            expect(fs.existsSync('dist/documentation')).toBe(true);
            expect(fs.existsSync('dist/documentation/ng-es2015-webpack')).toBe(true);
            fs.readdirSync('dist/documentation/ng-es2015-webpack').forEach(function (file) {
                expect(fs.existsSync(`dist/documentation/ng-es2015-webpack/${file}/index.html`)).toBe(true);
            });
        });
    });
});

function rm_rf(inputPath) {
    var folderPath = path.resolve(process.cwd(), inputPath);
    if (folderPath === '/') throw new Error('Attempted to delete root directory!');

    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach(function (file) {
            var filePath = path.join(folderPath, file);
            if (fs.lstatSync(filePath).isDirectory()) {
                rm_rf(filePath);
            } else {
                fs.unlinkSync(filePath);
            }
        });

        fs.rmdirSync(folderPath);
    }
}