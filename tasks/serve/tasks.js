import gulp from 'gulp';
import browserSync from 'browser-sync';

function startDevServer() {
    let staticServer = browserSync.create();

    staticServer.init({
        port: 3000,
        ui: false,
        ghostMode: false,
        open: false,
        single: true,
        server: {
            baseDir: 'dist'
        }
    });

    gulp.watch('dist/**/*', staticServer.reload);
}

gulp.task('devserver', startDevServer);

export { startDevServer };
