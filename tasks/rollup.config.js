// This config file is used to build a Gulpfile for the NodeJS version used to run the build,
// The Gulpfile will normally be created automatically after an `npm install` is completed.
// If a change to the source code in this folder is made after installing dependencies,
// then the generated gulpfile will need to be manually rebuilt. See `package.json`
// to reference the correct script to run in order to rebuild the Gulpfile.

import babel from 'rollup-plugin-babel';

export default {
    input: 'tasks/main.js',
    output: {
        file: 'gulpfile.js',
        sourcemap: false,
        format: 'cjs',
        interop: false
    },
    plugins: [
        babel({
            exclude: 'node_modules/**'
        })
    ],
    experimentalDynamicImport: true
};
