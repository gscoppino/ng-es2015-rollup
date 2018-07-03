import path from 'path';

export default {
    mode: 'development',

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

    // The section configures the rules that imports are applied against.
    // Imports that match patterns in the rules will have those rules
    // applied to them (unless they are explicitly excluded).
    // NOTE: The rules are evaluated in reverse order.
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
            // Import HTML as ES2015 template strings.
            {
                test: /\.html$/,
                include: [path.resolve(process.cwd(), 'src')],
                exclude: [path.resolve(process.cwd(), 'node_modules')],
                use: [{ loader: 'html-loader', options: {
                    url: false
                }}]
            },
            // Transform syntax to a format supported by the target environment, for all source and spec files.
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
