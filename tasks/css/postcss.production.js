import cssnano from 'cssnano';

import POSTCSS_CONFIG from './postcss.dev.js';
import BROWSERS from './browserslist.js';
import pathconfig from './pathconfig.js';

// Write to different file than dev version
// Add minification step
const POSTCSS_PRODUCTION_CONFIG = Object.assign({}, POSTCSS_CONFIG, {
    from: pathconfig.entry,
    to: pathconfig.productionBundle,
    map: false,
    plugins: [
        ...POSTCSS_CONFIG.plugins,
        cssnano({
            browsers: BROWSERS
        })
    ]
});

export default POSTCSS_PRODUCTION_CONFIG;
