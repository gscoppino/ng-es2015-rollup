import path from 'path';

import pathconfig from './pathconfig.js';

export default {
    // Output bundle as IIFE.
    target: 'web',

    entry: {
        [path.basename(pathconfig.devBundle, '.js')]: [
            // All entries are loaded into the bundle,
            // but only the last is exported.
            'babel-polyfill',
            pathconfig.entry
        ],
        // Use a stub for the production service worker to prevent errors in development.
        sw: path.resolve(process.cwd(), 'src', 'sw.js')
    },

    output: {
        // Output bundle and sourcemap.
        path: path.dirname(pathconfig.devBundle),
        filename: '[name].js',
        sourceMapFilename: '[file].map',

        // Make the sourcemaps show on the same
        // network path as the host server.
        devtoolModuleFilenameTemplate: '[resource-path]'
    },

    resolve: {
        modules: [
            // Allow importing files relative to the application root.
            path.resolve(process.cwd(), 'src'),

            // Allow importing modules from node_modules.
            'node_modules'
        ]
    },

    // The section configures the pipeline that imports are applied against.
    // Imports that match patterns in the pipeline will have those pipelines
    // applied to them (unless they are explicitly excluded).
    // NOTE: The pipeline is evaluated tail to head.
    module: {
        rules: [
            // Lint all Javascript files.
            {
                test: /\.js$/,
                include: [path.resolve(process.cwd(), 'src')],
                exclude: [path.resolve(process.cwd(), 'node_modules')],
                enforce: 'pre',
                use: ['eslint-loader']
            },

            // Import HTML as raw strings.
            {
                test: /\.html$/,
                include: [path.resolve(process.cwd(), 'src')],
                exclude: [path.resolve(process.cwd(), 'node_modules')],
                use: ['raw-loader']
            },
            // Transform ES2015 syntax to ES5 for all source files.
            {
                test: /\.js$/,
                include: [path.resolve(process.cwd(), 'src')],
                exclude: [path.resolve(process.cwd(), 'node_modules')],
                use: ['babel-loader']
            }
        ]
    },

    plugins: [],

    // Emit a sourcemap that can be directed to an external file.
    devtool: 'source-map'
};
