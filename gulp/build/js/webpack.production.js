import webpack from 'webpack';
import WEBPACK_CONFIG from './webpack.dev';

// Disable emitting of sourcemaps.
const WEBPACK_PRODUCTION_CONFIG = Object.assign({}, WEBPACK_CONFIG, {
    devtool: undefined
});

// Disable sourcemap output.
WEBPACK_PRODUCTION_CONFIG.output = Object.assign({}, WEBPACK_PRODUCTION_CONFIG.output, {
    filename: 'main.js',
    sourceMapFilename: undefined,
    devtoolModuleFilenameTemplate: undefined
});

// Minify the resulting bundle.
WEBPACK_PRODUCTION_CONFIG.plugins = [
    ...WEBPACK_PRODUCTION_CONFIG.plugins,
    new webpack.optimize.UglifyJsPlugin({ sourceMap: false })
];

export default WEBPACK_PRODUCTION_CONFIG;
