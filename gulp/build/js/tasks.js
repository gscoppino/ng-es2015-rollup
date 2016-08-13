import gulp from 'gulp';
import path from 'path';
import del from 'del';
import webpack from 'webpack';
import WEBPACK_DEV_CONFIG from './webpack.dev';
import WEBPACK_PRODUCTION_CONFIG from './webpack.production';

gulp.task('clean:js', ()=> del([
    path.resolve(WEBPACK_DEV_CONFIG.output.path, WEBPACK_DEV_CONFIG.output.filename),
    path.resolve(WEBPACK_DEV_CONFIG.output.path, WEBPACK_DEV_CONFIG.output.filename+'.map'),
    path.resolve(WEBPACK_PRODUCTION_CONFIG.output.path, WEBPACK_PRODUCTION_CONFIG.output.filename)
]));

gulp.task('build:js', ['clean:js'], (fin)=> {
    webpack(WEBPACK_DEV_CONFIG).run((error)=> {
        if (error) throw new Error('webpack', error);
        else fin();
    });
});

gulp.task('watch:js', ['clean:js'], ()=> {
    webpack(WEBPACK_DEV_CONFIG).watch({}, (error)=> {
        if (error) throw new Error('webpack', error);
        else console.log('webpack rebundle complete.');
    });
});

gulp.task('build:js-production', ['clean:js'], (fin)=> {
    return webpack(WEBPACK_PRODUCTION_CONFIG).run((error)=> {
        if (error) throw new Error('webpack', error);
        else fin();
    });
});
