import path from 'path';

import pathconfig from './pathconfig.js';

export default {
    mode: 'development',

    // Output bundle as IIFE.
    target: 'web',

    entry: {
        [path.basename(pathconfig.devBundle, '.js')]: pathconfig.entry,
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

    // The section configures the rules that imports are applied against.
    // Imports that match patterns in the rules will have those rules
    // applied to them (unless they are explicitly excluded).
    // NOTE: The rules is evaluated in reverse order.
    module: {
        rules: [
            // Lint all HTML files.
            {
                test: /\.html$/,
                include: [path.resolve(process.cwd(), 'src')],
                exclude: [path.resolve(process.cwd(), 'node_modules')],
                enforce: 'pre',
                use: ['htmlhint']
            },

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
            // Transform syntax to a format supported by the target environment.
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
