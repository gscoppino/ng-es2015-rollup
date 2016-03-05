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
            exclude: 'node_modules/**'
        }),
        commonjs({
            include: 'node_modules/**'
        }),
        node_resolve()
    ]
};