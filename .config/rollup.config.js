import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import node_resolve from 'rollup-plugin-node-resolve';

export default {
    entry: 'src/main.js',
    dest: 'dist/main.js',
    format: 'iife',
    moduleName: 'App',
    sourceMap: true,
    plugins: [
        babel({
            include: 'src/**',
            exclude: 'node_modules/**'
        }),
        node_resolve({
            jsnext: true,
            main: true,
            browser: true
        }),
        commonjs({
            include: 'node_modules/**',
            exclude: 'src/**'
        })
    ]
};