import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import node_resolve from 'rollup-plugin-node-resolve';

export default {
    rollup: {
        entry: 'src/main.js',
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
    },
    bundle: {
        dest: 'dist/main.js',
        format: 'iife',
        moduleName: 'App',
        sourceMap: true
    }
};