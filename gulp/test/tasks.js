import gulp from 'gulp';
import del from 'del';
import karma from 'karma';
import KARMA_CONFIG from './karma.config';

gulp.task('clean:test-coverage', () => del('dist/coverage'));

gulp.task('test', ['clean:test-coverage'], (done)=> {
    KARMA_CONFIG.singleRun = true;
    KARMA_CONFIG.autoWatch = false;
    new karma.Server(KARMA_CONFIG, (exitCode)=> {
        process.exit(exitCode);
        done();
    }).start();
});

gulp.task('watch:test', ['clean:test-coverage'], ()=> {
    KARMA_CONFIG.singleRun = false;
    KARMA_CONFIG.autoWatch = true;
    new karma.Server(KARMA_CONFIG).start();
});