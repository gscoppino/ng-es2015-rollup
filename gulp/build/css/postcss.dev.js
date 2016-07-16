import stylelint from 'stylelint';
import reporter from 'postcss-reporter';
import cssimport from 'postcss-import';
import cssnext from 'postcss-cssnext';
import BROWSERS from './browserslist';

export default {
    from: 'src/main.css',
    to: 'dist/main.css',
    map: { inline: false },
    plugins: [
        stylelint(),
        cssimport({
            plugins: [stylelint()]
        }),
        cssnext({
            browsers: BROWSERS
        }),
        reporter()
    ]
};
