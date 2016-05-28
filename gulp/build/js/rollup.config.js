import fs from 'fs';
import eslint from 'rollup-plugin-eslint';
import babel from 'rollup-plugin-babel';
import text from 'rollup-plugin-string';
import include_paths from 'rollup-plugin-includepaths';
import node_resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    rollup: {
        entry: 'src/main.js',
        plugins: [
            // Lint source files for syntax errors, code style adherance, and potential oversights.
            eslint({
                include: ['src/*.js', 'src/**/*.js'],
                exclude: 'node_modules/**'
            }),
            // Transform ES2015 syntax to ES5, sans module imports/exports
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
            // Allow resolution of relative imports from application root
            include_paths({
                paths: ['src']
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
        banner: fs.readFileSync('node_modules/babel-polyfill/dist/polyfill.min.js'), // Polyfill ES2015 features.
        format: 'iife',
        moduleName: 'App',
        sourceMap: true
    }
};
