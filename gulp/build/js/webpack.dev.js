import path from 'path';

export default {
    entry: [
        path.resolve(process.cwd(), 'node_modules', 'babel-polyfill', 'dist', 'polyfill.min.js'),
        path.resolve(process.cwd(), 'src', 'main.js'),
    ],

    output: {
        path: path.resolve(process.cwd(), 'dist'),
        filename: 'main.js',
        sourceMapFilename: '[file].map',

        // By default, webpack maps all sources to its own network path
        // in the sourcemap.
        // Override it so that sources show up on the host network path.
        devtoolModuleFilenameTemplate: '[resource-path]'
    },

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
            // Transform ES2015 syntax to ES5 for all spec files.
            {
                test: /\.js$/,
                include: [path.resolve(process.cwd(), 'src')],
                exclude: [path.resolve(process.cwd(), 'node_modules')],
                loaders: ['babel-loader']
            }
        ]
    },

    plugins: [],

    // Configure the type of sourcemap desired to be, external file
    devtool: 'source-map'
};
