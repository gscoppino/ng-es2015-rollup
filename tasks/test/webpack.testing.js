import path from 'path';

export default {
    // Output bundle as IIFE.
    target: 'web',

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
            // Transform ES2015 syntax to ES5 for all source and spec files.
            // Instrumentation of source files for code coverage is done
            // internally by Babel itself via a plugin (see src/.babelrc).
            {
                test: /\.js$/,
                include: [path.resolve(process.cwd(), 'src')],
                exclude: [path.resolve(process.cwd(), 'node_modules')],
                use: ['babel-loader']
            }
        ]
    },

    // Emit a sourcemap that will be inlined into the bundle.
    devtool: 'inline-source-map'
};
