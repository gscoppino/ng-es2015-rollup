import gulp from 'gulp';
import browserSync from 'browser-sync';
import historyApiMiddleware from 'connect-history-api-fallback';

function startDevServer() {
    let staticServer = browserSync.create();

    staticServer.init({
        port: 3000,
        ui: false,
        server: {
            baseDir: 'dist',
            middleware: [
                historyApiMiddleware({ index: '/index.html' })
            ]
        }
    });

    gulp.watch('dist/**/*', staticServer.reload);
}

gulp.task('devserver', startDevServer);

export { startDevServer };
