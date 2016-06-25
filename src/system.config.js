System.config({
    baseURL: './',
    defaultJSExtensions: true, // TODO: Add explicit JS extension
    map: {
        // Loaders / Plugins
        'html-import': 'node_modules/systemjs-plugin-text/text.js',
        'es5-transpile': 'node_modules/systemjs-plugin-babel/plugin-babel.js',
        'es5-transpile-browser': 'node_modules/systemjs-plugin-babel/system-babel-browser.js',

        // Namespaces
        'app': 'src/app',

        // External Dependencies
        'angular': 'node_modules/angular/angular.js',
        'angular-ui-router': 'node_modules/angular-ui-router/release/angular-ui-router.js'
    },
    meta: {
        'src/app/**/*.html': { loader: 'html-import' },
        'src/**/*.js': { loader: 'es5-transpile' }
    }
});
