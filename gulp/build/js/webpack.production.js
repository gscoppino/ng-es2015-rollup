import webpack from 'webpack';
import WEBPACK_CONFIG from './webpack.dev';

const WEBPACK_PRODUCTION_CONFIG = Object.assign({}, WEBPACK_CONFIG);

delete WEBPACK_PRODUCTION_CONFIG.devtool;

WEBPACK_PRODUCTION_CONFIG.output = Object.assign({}, WEBPACK_PRODUCTION_CONFIG.output, {
    filename: 'main.js'
});
delete WEBPACK_PRODUCTION_CONFIG.output.sourceMapFilename;
delete WEBPACK_PRODUCTION_CONFIG.output.devtoolModuleFilenameTemplate;

WEBPACK_PRODUCTION_CONFIG.plugins = WEBPACK_PRODUCTION_CONFIG.plugins.concat([
    new webpack.optimize.UglifyJsPlugin({ sourceMap: false })
]);

export default WEBPACK_PRODUCTION_CONFIG;
