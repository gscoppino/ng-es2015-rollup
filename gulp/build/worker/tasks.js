import gulp from 'gulp';
import del from 'del';
import swPrecache from 'sw-precache';

gulp.task('clean:worker', () => del('dist/sw.js'));

gulp.task('build:worker', (done) => {
    swPrecache.write('./dist/sw.js', {
        staticFileGlobs: [
            'src/index.html',
            'src/main.css',
            'src/main.js'
        ],
        stripPrefix: 'src/'
    }, done);
});