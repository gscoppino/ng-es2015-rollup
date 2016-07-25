import POSTCSS_CONFIG from './postcss.dev';
import BROWSERS from './browserslist';
import cssnano from 'cssnano';

// Write to different file than dev version
// Add minification step
const POSTCSS_PRODUCTION_CONFIG = Object.assign({}, POSTCSS_CONFIG, {
    to: 'dist/main.css',
    map: false,
    plugins: [
        ...POSTCSS_CONFIG.plugins,
        cssnano({
            browsers: BROWSERS
        })
    ]
});

export default POSTCSS_PRODUCTION_CONFIG;
