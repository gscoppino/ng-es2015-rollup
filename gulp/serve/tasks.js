import gulp from 'gulp';
import browserSync from 'browser-sync';
import historyApiMiddleware from 'connect-history-api-fallback';

gulp.task('devserver', ()=> {
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
});
