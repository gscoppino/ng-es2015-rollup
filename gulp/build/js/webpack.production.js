import webpack from 'webpack';
import WEBPACK_CONFIG from './webpack.dev.js';
import pathconfig from './pathconfig.js';

// Disable emitting of sourcemaps.
const WEBPACK_PRODUCTION_CONFIG = Object.assign({}, WEBPACK_CONFIG, {
    devtool: undefined
});

// Disable the stubbed production worker from the development build.
WEBPACK_PRODUCTION_CONFIG.entry = WEBPACK_PRODUCTION_CONFIG.entry.main;

// Disable sourcemap output.
WEBPACK_PRODUCTION_CONFIG.output = Object.assign({}, WEBPACK_PRODUCTION_CONFIG.output, {
    filename: pathconfig.out.filename,
    sourceMapFilename: undefined,
    devtoolModuleFilenameTemplate: undefined
});

// Minify the resulting bundle.
WEBPACK_PRODUCTION_CONFIG.plugins = [
    ...WEBPACK_PRODUCTION_CONFIG.plugins,
    new webpack.optimize.UglifyJsPlugin({ sourceMap: false })
];

export default WEBPACK_PRODUCTION_CONFIG;
