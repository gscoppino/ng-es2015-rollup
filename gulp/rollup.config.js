import babel from 'rollup-plugin-babel';

export default {
    entry: 'gulpfile.babel.js',
    dest: 'gulpfile.js',
    plugins: [
        babel({
            exclude: 'node_modules/**'
        })
    ],
    format: 'cjs',
    sourceMap: 'inline'
};
