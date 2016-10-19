import gulp from 'gulp';
import del from 'del';
import karma from 'karma';
import System from 'systemjs';

function lazyLoadKarmaConfig() {
    System.config({
        map: {
            'path': '@node/path'
        }
    });

    return System.import('tasks/test/karma.config.js')
        .then(m => m.default);
}

gulp.task('clean:test-coverage', () => del('dist/coverage'));

gulp.task('test', ['clean:test-coverage'], (fin)=> {
    lazyLoadKarmaConfig().then((KARMA_CONFIG) => {
        KARMA_CONFIG.singleRun = true;
        KARMA_CONFIG.autoWatch = false;
        new karma.Server(KARMA_CONFIG, (exitCode) => {
            process.exit(exitCode);
            fin();
        }).start();
    });
});

gulp.task('watch:test', ['clean:test-coverage'], ()=> {
    return lazyLoadKarmaConfig().then((KARMA_CONFIG) => {
        KARMA_CONFIG.singleRun = false;
        KARMA_CONFIG.autoWatch = true;
        new karma.Server(KARMA_CONFIG).start();
    });
});