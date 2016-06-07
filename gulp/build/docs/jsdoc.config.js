export default {
    opts: {
        destination: 'dist/documentation'
    },
    plugins: [
        'node_modules/jsdoc-babel'
    ],
    babel: {
        plugins: ['transform-class-properties']
    }
};
