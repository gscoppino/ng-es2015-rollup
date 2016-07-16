import POSTCSS_CONFIG from './postcss.dev';
import BROWSERS from './browserslist';
import cssnano from 'cssnano';

// Write to different file than dev version
const POSTCSS_PRODUCTION_CONFIG = Object.assign({}, POSTCSS_CONFIG, { to: 'dist/main.min.css' });
POSTCSS_PRODUCTION_CONFIG.map = false;
// Add minification step
POSTCSS_PRODUCTION_CONFIG.plugins = POSTCSS_PRODUCTION_CONFIG.plugins
    .concat(cssnano({
        browsers: BROWSERS
    }));

export default POSTCSS_PRODUCTION_CONFIG;
