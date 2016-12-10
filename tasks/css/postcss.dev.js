import stylelint from 'stylelint';
import reporter from 'postcss-reporter';
import cssimport from 'postcss-import';
import cssnext from 'postcss-cssnext';

import pathconfig from './pathconfig.js';
import BROWSERS from './browserslist.js';

export default {
    from: pathconfig.entry,
    to: pathconfig.devBundle,
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
