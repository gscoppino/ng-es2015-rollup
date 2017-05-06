import path from 'path';
import webpack from 'webpack';
import SWPrecacheWebpackPlugin from 'sw-precache-webpack-plugin';

import WEBPACK_CONFIG from './webpack.dev.js';
import pathconfig from './pathconfig.js';

// Disable emitting of sourcemaps.
const WEBPACK_PRODUCTION_CONFIG = Object.assign({}, WEBPACK_CONFIG, {
    devtool: undefined
});

// Disable the mock service worker that is output in development mode.
WEBPACK_PRODUCTION_CONFIG.entry = {
    [path.basename(pathconfig.productionBundle, '.js')]: [
        // All entries are loaded into the bundle,
        // but only the last is exported.
        'babel-polyfill',
        pathconfig.entry
    ]
};

// Disable sourcemap output.
WEBPACK_PRODUCTION_CONFIG.output = Object.assign({}, WEBPACK_PRODUCTION_CONFIG.output, {
    sourceMapFilename: undefined,
    devtoolModuleFilenameTemplate: undefined
});

// Flip the development and production mode flags
WEBPACK_PRODUCTION_CONFIG.module = Object.assign({}, WEBPACK_PRODUCTION_CONFIG.module, {
    rules: WEBPACK_PRODUCTION_CONFIG.module.rules
        .map(rule => {
            let newRule = Object.assign({}, rule, {
                use: rule.use.map(use => {
                    if (typeof use === 'string') {
                        return use;
                    } else {
                        return Object.assign({}, use);
                    }
                })
            });

            if (newRule.use[0] && newRule.use[0].loader === 'preprocess-loader') {
                newRule.use[0] = Object.assign({}, newRule.use[0], {
                    options: {
                        PRODUCTION_MODE: true
                    }
                });
            }

            return newRule;
        })
});

// Minify the resulting bundle.
WEBPACK_PRODUCTION_CONFIG.plugins = [
    ...WEBPACK_PRODUCTION_CONFIG.plugins,
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: false
    }),
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
