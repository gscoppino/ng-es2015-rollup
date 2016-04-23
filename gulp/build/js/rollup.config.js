import babel from 'rollup-plugin-babel';
import text from 'rollup-plugin-string';
import node_resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    rollup: {
        entry: 'src/main.js',
        plugins: [
            // Transform ES2015 to ES5, sans module imports/exports
            babel({
                include: ['src/*.js', 'src/**/*.js'],
                exclude: 'node_modules/**'
            }),
            // Resolve relative HTML imports
            text({
                include: 'src/**/*.html',
                exclude: 'node_modules/**',
                extensions: ['.html']
            }),
            // Resolve any non-relative module imports using NPM
            node_resolve({
                jsnext: true,
                main: true,
                browser: true
            }),
            // Transform CommonJS modules from NPM into ES2015 modules, suitable for bundling via rollup
            commonjs({
                include: 'node_modules/**',
                exclude: 'src/**'
            })
        ]
    },
    bundle: {
        dest: 'dist/main.js',
        format: 'iife',
        moduleName: 'App',
        sourceMap: true
    }
};