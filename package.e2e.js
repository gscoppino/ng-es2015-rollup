const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

const NPM = /^win/.test(process.platform) ? 'npm.cmd' : 'npm';
const NPX = /^win/.test(process.platform) ? 'npx.cmd' : 'npx';

describe('ng-modern-boilerplate', () => {
    const DEV_ARTIFACTS = [
        'dist/fallback.html',
        'dist/index.html',
        'dist/main.css',
        'dist/main.css.map',
        'dist/main.js',
        'dist/main.js.map',
        'dist/sw.js',
        'dist/sw.js.map'
    ];

    const PROD_ARTIFACTS = [
        'dist/fallback.html',
        'dist/index.html',
        'dist/main.css',
        'dist/main.js',
        'dist/sw.js'
    ];

    beforeEach(() => {
        rm_rf('dist');
    });

    afterAll(() => {
        rm_rf('dist');
    });

    describe('clean', () => {
        beforeAll(() => {
            console.log('\n');
            console.log('Testing clean task...');
            console.log('---------------------');
        });

        it('should remove dev build artifacts created by "npm run build".', () => {
            fs.mkdirSync('dist');
            fs.mkdirSync('dist/fallback');
            DEV_ARTIFACTS.forEach(function (artifact) {
                fs.writeFileSync(artifact, '');
            });

            let clean = startSynchronousNPMTask('clean');

            expect(clean.status).toBe(0);
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

            let clean = startSynchronousNPMTask('clean');

            expect(clean.status).toBe(0);
            PROD_ARTIFACTS.forEach(function (artifact) {
                expect(fs.existsSync(artifact)).toBe(false);
            });
        });
    });

    describe('build', () => {
        beforeAll(() => {
            console.log('\n');
            console.log('Testing development build task...');
            console.log('---------------------------------');
        });

        it('should create the correct build artifacts in the dist folder.', () => {
            let build = startSynchronousNPMTask('build');

            expect(build.status).toBe(0);
            DEV_ARTIFACTS.concat([
                'dist',
                'dist/fallback'
            ]).forEach(function (artifact) {
                expect(fs.existsSync(artifact)).toBe(true);
            });
        });
    });

    describe('build-production', () => {
        beforeAll(() => {
            console.log('\n');
            console.log('Testing production build task...');
            console.log('--------------------------------');
        });

        it('should create the correct build artifacts in the dist folder.', () => {
            let build = startSynchronousNPMTask('build-production');

            expect(build.status).toBe(0);
            PROD_ARTIFACTS.concat([
                'dist',
                'dist/fallback'
            ]).forEach(function (artifact) {
                expect(fs.existsSync(artifact)).toBe(true);
            });
        });
    });

    describe('test-unit', () => {
        beforeAll(() => {
            console.log('\n');
            console.log('Unit test task...');
            console.log('-----------------');
        });

        it('should run the unit tests for the source code, and output HTML coverage info.', () => {
            let test = startSynchronousNPMTask('test-unit');

            expect(test.status).toBe(0);
            expect(fs.existsSync('dist/coverage')).toBe(true);
            expect(fs.existsSync('dist/coverage/html')).toBe(true);
            expect(fs.existsSync('dist/coverage/html/index.html')).toBe(true);
        });
    });

    describe('test-e2e', () => {
        beforeAll(() => {
            console.log('\n');
            console.log('Integration test task...');
            console.log('------------------------');
        });

        it('should run the end to end tests for the production code.', () => {
            let server = child_process.spawn(NPX, ['gulp', 'server'], {
                detached: true,
                stdio: 'inherit'
            });

            startSynchronousNPMTask('build-production');

            let test = startSynchronousNPMTask('test-integration-dev');

            expect(test.status).toBe(0);
        });
    });

    describe('documentation', () => {
        beforeAll(() => {
            console.log('\n');
            console.log('Testing documentation generation task...');
            console.log('----------------------------------------');
        });

        it('should generate docs for the source code.', () => {
            let docgen = startSynchronousNPMTask('documentation');

            expect(docgen.status).toBe(0);
            expect(fs.existsSync('dist/documentation')).toBe(true);
            expect(fs.existsSync('dist/documentation/index.html')).toBe(true);
        });
    });
});

function startSynchronousNPMTask(taskName) {
    return child_process.spawnSync(NPM, ['run', taskName], {
        stdio: 'inherit'
    });
}

function rm_rf(inputPath) {
    let folderPath = path.resolve(process.cwd(), inputPath);
    if (folderPath === '/') throw new Error('Attempted to delete root directory!');

    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach(function (file) {
            let filePath = path.join(folderPath, file);
            if (fs.lstatSync(filePath).isDirectory()) {
                rm_rf(filePath);
            } else {
                fs.unlinkSync(filePath);
            }
        });

        fs.rmdirSync(folderPath);
    }
}
