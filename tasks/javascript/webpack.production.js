import path from 'path';
import webpack from 'webpack';
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin';

import WEBPACK_CONFIG from './webpack.dev.js';
import pathconfig from './pathconfig.js';

// Disable emitting of sourcemaps.
const WEBPACK_PRODUCTION_CONFIG = Object.assign({}, WEBPACK_CONFIG, {
    mode: 'production',
    devtool: undefined
});

// Disable the mock service worker that is output in development mode.
WEBPACK_PRODUCTION_CONFIG.entry = {
    [path.basename(pathconfig.productionBundle, '.js')]: pathconfig.entry
};

// Disable sourcemap output.
WEBPACK_PRODUCTION_CONFIG.output = Object.assign({}, WEBPACK_PRODUCTION_CONFIG.output, {
    sourceMapFilename: undefined,
    devtoolModuleFilenameTemplate: undefined
});

// Minify the resulting bundle.
WEBPACK_PRODUCTION_CONFIG.plugins = [
    ...WEBPACK_PRODUCTION_CONFIG.plugins,
    new SWPrecacheWebpackPlugin({
        filename: 'sw.js',
        minify: true,
        staticFileGlobs: [
            'dist/index.html',
            'dist/main.css',
            'dist/main.js'
        ],
        stripPrefix: 'dist/'
    })
];

export default WEBPACK_PRODUCTION_CONFIG;
