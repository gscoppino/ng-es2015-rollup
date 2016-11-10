// This config file is used to create a Gulpfile in ES5 from the
// ES2015 source code in this folder. This normally will happen
// automatically after an `npm install` is completed. If a change
// to the source code in this folder is made after installing dependencies,
// then the generated gulpfile will need to be manually rebuilt. See `package.json`
// to reference the correct script to run in order to rebuild the Gulpfile, or just
// run `npm install` again.

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
