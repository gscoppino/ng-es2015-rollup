import path from 'path';

export default {

    // This section configures how imports are resolved by webpck.
    resolve: {
        // Allow importing relative to the application root
        root: path.resolve(process.cwd(), 'src'),
        // Allow importing from node_modules
        modulesDirectories: ['node_modules']
    },

    // The section configures the pipeline that imports are tested against.
    // Imports that match patterns in the pipeline will have those pipelines
    // applied to them (unless they are explicitly excluded).
    // NOTE: The pipeline is evaluated tail to head at each stage.
    module: {
        preLoaders: [
            // Lint all Javascript files
            {
                test: /\.js$/,
                include: [path.resolve(process.cwd(), 'src')],
                exclude: [path.resolve(process.cwd(), 'node_modules')],
                loaders: ['eslint-loader']
            }
        ],
        loaders: [
            // Import HTML as raw strings
            {
                test: /\.html$/,
                include: [path.resolve(process.cwd(), 'src')],
                exclude: [path.resolve(process.cwd(), 'node_modules')],
                loaders: ['raw-loader']
            },
            // Transform ES2015 syntax to ES5 for all source files, and instrument
            // the code so we can obtain coverage metrics at runtime.
            {
                test: /\.js$/,
                include: [path.resolve(process.cwd(), 'src')],
                exclude: [/\.spec\.js$/, path.resolve(process.cwd(), 'node_modules')],
                loaders: ['babel-istanbul']
            },
            // Transform ES2015 syntax to ES5 for all spec files.
            {
                test: /\.spec\.js$/,
                include: [path.resolve(process.cwd(), 'src')],
                exclude: [path.resolve(process.cwd(), 'node_modules')],
                loaders: ['babel-loader']
            }
        ]
    },

    // Configure the type of sourcemap desired to inline
    devtool: 'inline-source-map'
};
