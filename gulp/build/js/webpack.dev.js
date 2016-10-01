import path from 'path';
import pathconfig from './pathconfig.js';

export default {
    // Output bundle as IIFE.
    target: 'web',

    entry: {
        main: [
            // All entries are loaded into the bundle,
            // but only the last is exported.
            path.resolve(process.cwd(), 'node_modules', 'babel-polyfill', 'dist', 'polyfill.js'),
            pathconfig.in.path
        ],
        // Use a stub for the production service worker to prevent errors in development.
        sw: path.resolve(process.cwd(), 'src', 'sw.js')
    },

    output: {
        // Output bundle and sourcemap.
        path: pathconfig.out.directory,
        filename: '[name].js',
        sourceMapFilename: '[file].map',

        // Make the sourcemaps show on the same
        // network path as the host server.
        devtoolModuleFilenameTemplate: '[resource-path]'
    },

    resolve: {
        // Allow importing files relative to the application root.
        root: path.resolve(process.cwd(), 'src'),

        // Allow importing modules from node_modules.
        modulesDirectories: ['node_modules']
    },

    // The section configures the pipeline that imports are applied against.
    // Imports that match patterns in the pipeline will have those pipelines
    // applied to them (unless they are explicitly excluded).
    // NOTE: The pipeline is evaluated tail to head at each stage.
    module: {
        preLoaders: [
            // Lint all Javascript files.
            {
                test: /\.js$/,
                include: [path.resolve(process.cwd(), 'src')],
                exclude: [path.resolve(process.cwd(), 'node_modules')],
                loaders: ['eslint-loader']
            }
        ],
        loaders: [
            // Import HTML as raw strings.
            {
                test: /\.html$/,
                include: [path.resolve(process.cwd(), 'src')],
                exclude: [path.resolve(process.cwd(), 'node_modules')],
                loaders: ['raw-loader']
            },
            // Transform ES2015 syntax to ES5 for all source files.
            {
                test: /\.js$/,
                include: [path.resolve(process.cwd(), 'src')],
                exclude: [path.resolve(process.cwd(), 'node_modules')],
                loaders: ['babel-loader']
            }
        ]
    },

    plugins: [],

    // Emit a sourcemap that can be directed to an external file.
    devtool: 'source-map'
};
