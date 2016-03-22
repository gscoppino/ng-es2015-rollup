import gulp from 'gulp';
import gutil from 'gulp-util';
import browserSync from 'browser-sync';

let server;
if (process.argv[2] !== 'develop') 
    server = { reload: noop=>{}, stream: gutil.noop };
else
    server = browserSync.create();

gulp.task('serve', ()=> {
    server.init({
        server: {
            baseDir: 'dist'
        }
    });
});
