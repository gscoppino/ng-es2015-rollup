import babel from 'rollup-plugin-babel';

export default {
    entry: 'tasks/main.js',
    dest: 'gulpfile.js',
    plugins: [
        babel({
            exclude: 'node_modules/**'
        })
    ],
    format: 'cjs',
    interop: false,
    sourceMap: false
};
