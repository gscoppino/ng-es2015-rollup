import gulp from 'gulp';
import browserSync from 'browser-sync';
import historyApiMiddleware from 'connect-history-api-fallback';
import jsonServer from 'json-server';

gulp.task('devserver', ()=> {
    let staticServer = browserSync.create();
    let apiServer = jsonServer.create();

    staticServer.init({
        server: {
            baseDir: 'dist',
            middleware: historyApiMiddleware({ index: '/index.html' })
        }
    }, function (error, instance) {
        apiServer.use(jsonServer.defaults());
        apiServer.use(jsonServer.router('gulp/serve/db.json'));
        instance.app.use('/api', apiServer);
    });

    gulp.watch('dist/**/*', staticServer.reload);
});
