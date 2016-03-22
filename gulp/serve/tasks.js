import gulp from 'gulp';
import browserSync from 'browser-sync';

gulp.task('devserver', ()=> {
    let server = browserSync.create();
    
    server.init({
        server: {
            baseDir: 'dist'
        }
    });
    
    gulp.watch('dist/**/*', server.reload);
});
