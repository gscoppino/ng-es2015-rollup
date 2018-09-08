import gulp from 'gulp';
import browserSync from 'browser-sync';

function startServer() {
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

    return staticServer;
}

function startDevServer() {
    let staticServer = startServer();

    gulp.watch('dist/**/*', staticServer.reload);
}

gulp.task('server', startServer);
gulp.task('devserver', startDevServer);

export { startServer };
export { startDevServer };
