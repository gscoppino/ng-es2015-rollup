import ROLLUP_CONFIG from './rollup.dev';
import minify from 'rollup-plugin-uglify';

const ROLLUP_PRODUCTION_CONFIG = Object.assign({}, ROLLUP_CONFIG);

// Add minification step
ROLLUP_PRODUCTION_CONFIG.rollup = Object.assign({}, ROLLUP_CONFIG.rollup, {
    plugins: [
        ...ROLLUP_CONFIG.rollup.plugins,
        minify()
    ]
});

// Write to a different file than dev version
ROLLUP_PRODUCTION_CONFIG.bundle = Object.assign({}, ROLLUP_CONFIG.bundle, {
    dest: 'dist/main.js',
    sourceMap: false
});

export default ROLLUP_PRODUCTION_CONFIG;
