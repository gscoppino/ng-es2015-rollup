import gulp from 'gulp';

gulp.task('watch:git', () => gulp.watch('.git/HEAD', ()=> {
    console.log('Change to git HEAD detected. Gracefully exiting...');
    process.exit(0);
}));
