import babel from 'rollup-plugin-babel';
import text from 'rollup-plugin-string';
import node_resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import istanbul from 'rollup-plugin-istanbul';

export default {
    rollup: {
        external: ['angular'], // Load Angular + Mocks via Karma instead to avoid angular-mocks multi-import bug.
        plugins: [
            // Transform ES2015 to ES5, sans module imports/exports
            babel({
                include: 'src/**/*.js',
                exclude: 'node_modules/**',
                retainLines: true // Sourcemaps are not working correct for coverage, this is a hack to get around that.
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
            }),
            // Instrument Javascript program code so that code coverage can be determined.
            istanbul({
                include: 'src/**/!(*.spec).js',
                exclude: ['src/**/*.spec.js', 'node_modules/**']
            })
        ]
    },
    bundle: {
        format: 'iife', // Transpiled ES5 exported as a global module.
        sourceMap: 'inline' // For use by Karma in stack traces and code coverage
    }
};