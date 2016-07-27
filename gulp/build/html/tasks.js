import gulp from 'gulp';
import inject from 'gulp-inject';
import htmlmin from 'gulp-htmlmin';
import postcss from 'gulp-postcss';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';
import BROWSERS from '../css/browserslist';
import INJECT_CRITICAL from './inject.config';
import del from 'del';

gulp.task('clean:markup', ()=> del('dist/*.html'));

gulp.task('build:markup', ['clean:markup'], ()=> {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('watch:markup', ['build:markup'], ()=> gulp.watch('src/*.html', ['build:markup']));

/*
 * Injects a hierarchical map of HTML files into the target stream. This
 * function will recursively call itself until there are no more injections to
 * do in any of the specified HTML files.
 * @param target - a stream of HTML file(s) created via gulp.src(...)
 * @param injectConfig - a map of source files to configuration describing
 * what is to be injected.
 */
function injectHTML(target, injectConfig) {
    function _inject(prev, next) {
        console.log("Injecting critical HTML from: ", next);
        prev.pipe(inject(gulp.src(next), {
            starttag: `<!-- inject:${this[next].tag} -->`,
            transform: (filePath, file) => file.contents.toString('utf8')
        }));

        if (this[next].childInjects) {
            return Object.keys(this[next].childInjects)
                .reduce(_inject.bind(this[next].childInjects), target);
        }

        return prev;
    }

    return Object.keys(injectConfig)
        .reduce(_inject.bind(injectConfig), target);
}

/*
 * Injects an ordered list of CSS files into the target stream.
 * @param target - a stream of HTML file(s) created via gulp.src(...)
 * @param source - an array of source CSS files to be inlined into the stream file(s)
 */
function injectCSS(target, source) {
    let transformedCSS = gulp.src(source)
        .pipe(postcss([
            cssnext({ browsers: BROWSERS }),
            cssnano({ browsers: BROWSERS })
        ]));

    console.log("Injecting critical CSS from: ", source);
    return target.pipe(inject(transformedCSS, {
        starttag: '<!-- inject:critical-css -->',
        transform: (filePath, file, index, length) => {
            let cssString = '';
            if (index === 0) cssString += '<style>';
            cssString += file.contents.toString('utf8').replace(/@import\s'.+';/gm, '');
            if (index === length - 1) cssString += '</style>';

            return cssString;
        }
    }));
}

gulp.task('build:markup-production', ['clean:markup'], ()=> {
    let target = gulp.src('src/index.html');

    return injectCSS(injectHTML(target, INJECT_CRITICAL.html), INJECT_CRITICAL.css)
        .pipe(htmlmin({ collapseWhitespace: true, conservativeCollapse: true }))
        .pipe(gulp.dest('dist'));
});
