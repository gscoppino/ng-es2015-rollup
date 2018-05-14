import gulp from 'gulp';
import del from 'del';
import karma from 'karma';

gulp.task('clean:test-coverage', () => del('dist/coverage'));

gulp.task('test', ['clean:test-coverage'], (callbackFn) => {
    import('./karma.config.js')
        .then(config => {
            config.singleRun = true;
            config.autoWatch = false;
            new karma.Server(config, (exitCode) => {
                process.exit(exitCode);
                callbackFn();
            }).start();
        });
});

gulp.task('watch:test', ['clean:test-coverage'], () => {
    import('./karma.config.js')
        .then(config => {
            config.singleRun = false;
            config.autoWatch = true;
            new karma.Server(config).start();
        });
});