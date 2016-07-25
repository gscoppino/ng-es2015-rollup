import gulp from 'gulp';
import inject from 'gulp-inject';
import htmlmin from 'gulp-htmlmin';
import postcss from 'gulp-postcss';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';
import BROWSERS from '../css/browserslist';
import del from 'del';

gulp.task('clean:markup', ()=> del('dist/*.html'));

gulp.task('build:markup', ['clean:markup'], ()=> {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('watch:markup', ['build:markup'], ()=> gulp.watch('src/*.html', ['build:markup']));

gulp.task('build:markup-production', ['clean:markup'], ()=> {
    let loaderSpinner = gulp.src([
        'src/app/common/components/loader-spinner/loader-spinner.html'
    ]);

    let appShell = gulp.src([
        'src/app/app.html'
    ])
        .pipe(inject(loaderSpinner, {
            starttag: '<!-- inject:app-shell:loader-spinner -->',
            transform: (filePath, file) => file.contents.toString('utf8').replace(/@import\s'.+';/gm, '')
        }))
        .pipe(htmlmin({ collapseWhitespace: true, conservativeCollapse: true }));

    let criticalCSS = gulp.src([
        'src/main.css',
        'src/app/common/styles/box-model.css',
        'src/app/app.css',
        'src/app/app-shell/app-shell.css',
        'src/app/common/components/loader-spinner/loader-spinner.css'
    ])
        .pipe(postcss([cssnext({ browsers: BROWSERS }), cssnano({ browsers: BROWSERS})]));

    return gulp.src('src/*.html')
        .pipe(inject(appShell, {
            starttag: '<!-- inject:app-shell -->',
            transform: (filePath, file) => file.contents.toString('utf8')
        }))
        .pipe(inject(criticalCSS, {
            starttag: '<!-- inject:critical-css -->',
            transform: (filePath, file, index, length) => {
                let cssString = '';
                if (index === 0) cssString += '<style>';
                cssString += file.contents.toString('utf8').replace(/@import\s'.+';/gm, '');
                if (index === length - 1) cssString += '</style>';

                return cssString;
            }
        }))
        .pipe(gulp.dest('dist'));
});
