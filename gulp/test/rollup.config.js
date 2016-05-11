import babel from 'rollup-plugin-babel';
import text from 'rollup-plugin-string';
import node_resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import istanbul from 'rollup-plugin-istanbul';

import babel_istanbul from 'babel-istanbul';
import { buildExternalHelpers as buildBabelHelpers } from 'babel-core';

export default {
    rollup: {
        external: ['angular'], // Load Angular + Mocks via Karma instead to avoid angular-mocks multi-import bug.
        plugins: [
            // Transform ES2015 syntax to ES5 for all spec files, sans module imports/exports
            // Do not attempt to determine Babel helpers as they will not be representative
            // of the actual code, due to source files not being transpiled yet
            babel({
                include: ['src/*.spec.js', 'src/**/*.spec.js'],
                exclude: ['src/!(*.spec).js', 'src/**/!(*.spec).js', 'node_modules/**'],
                externalHelpers: true
            }),
            // Instrument source code so that code coverage can be determined.
            // Babel is used during instrumentation to transform ES2015 syntax to ES5
            // for all source files, sans module imports/exports
            istanbul({
                include: ['src/!(*.spec).js', 'src/**/!(*.spec).js'],
                exclude: ['src/*.spec.js', 'src/**/*.spec.js', 'node_modules/**'],
                instrumenter: babel_istanbul
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
        format: 'iife', // Transpiled ES5 exported as a global module.
        sourceMap: 'inline', // For use by Karma in stack traces and code coverage
        intro: buildBabelHelpers() // Prepend the full suite of Babel helpers to the transpiled bundle
    }
};