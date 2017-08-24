// This config file is used to create a Gulpfile in ES5 from the
// ES2015 source code in this folder. This normally will happen
// automatically after an `npm install` is completed. If a change
// to the source code in this folder is made after installing dependencies,
// then the generated gulpfile will need to be manually rebuilt. See `package.json`
// to reference the correct script to run in order to rebuild the Gulpfile, or just
// run `npm install` again.

import babel from 'rollup-plugin-babel';

export default {
    input: 'tasks/main.js',
    output: {
        file: 'gulpfile.js',
        format: 'cjs'
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        })
    ],
    interop: false,
    sourceMap: false
};
