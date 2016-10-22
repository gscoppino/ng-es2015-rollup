Boilerplate for developing a new AngularJS 1.x single page application.

[![Build Status](https://travis-ci.org/gscoppino/ng-es2015-webpack.svg?branch=master)](https://travis-ci.org/gscoppino/ng-es2015-webpack)

Contents:
* Core skeleton of an Angular application using component architecture, with routing provided by [AngularUI Router](https://github.com/angular-ui/ui-router),
RESTful interfaces available through [Restangular](https://github.com/mgonto/restangular), and accessibility addressed by [ngAria](https://angularjs.org/).
* Unit test environment with code coverage in place via [Karma](https://karma-runner.github.io/1.0/index.html)+
[Jasmine](http://jasmine.github.io/)+[Istanbul](http://gotwarlost.github.io/istanbul/)+
[PhantomJS](http://phantomjs.org/), with boilerplate at 100% test coverage.
* Linting of CSS and Javascript in place, using [Stylelint](http://stylelint.io/) for the former, and [ESLint](http://eslint.org/) for the latter. Sensible defaults
in place through `stylelint-config-standard` and `eslint:recommended` presets, respectively.
* Automatic generation of app documentation available via [JSDoc](http://usejsdoc.org/).
* Offline support via [sw-precache](https://github.com/GoogleChrome/sw-precache).
* Development server provided using [BrowserSync](https://www.browsersync.io/), allowing for simultaneous multi-device runtime testing. Supports use of HTML5 History API
for frontend routing, and incremental builds (LiveReload). Can also simulate a production server by minifying assets and inlining critical HTML and CSS.

Features:
* ES2015. Everywhere. Write source code and unit tests in ES2015, import modules locally or from NPM using ES2015 `import` syntax, and get documentation and coverage reports
in ES2015. The build system, too, is written completely in ES2015. This is made possible thanks to [Webpack](https://webpack.github.io/), [SystemJS](https://github.com/systemjs/systemjs) and
[Babel](https://babeljs.io/). Webpack creates a bundle out of the tree of application imports, and Babel transpiles the source code in the bundle to ES5. SystemJS allows for
dynamic imports, which facilitates lazy loading. `babel-polyfill` is also included in the final bundle, in order to polyfill ES2015 features into whatever browser
the code is running in.
* Inline Angular component templates made possible through Webpack [raw-loader](https://github.com/webpack/raw-loader). Just import your templates using ES2015 `import` syntax.
* Use future CSS features now. Write stylesheets using upcoming CSS features such as selector nesting, variables, and the latest CSS properties (without vendor prefixes).
Import your local CSS or CSS from NPM using spec-compliant `@import` syntax.  This is made possible using [PostCSS](http://postcss.org/), [CSSNext](http://cssnext.io/),
and [Autoprefixer](https://autoprefixer.github.io/). The CSS will be bundled to work in today's browsers (with customizable ranges).
* Supports backendless development (enabled by default). This is accomplished through the use of [ngMockE2E and $httpBackend](https://angularjs.org/).
* Generator scripts for scaffolding new directives, components, and services from the command line.

Compatibility:

Configurable, but by default targets: IE9+, and the last two versions of all mainstream desktop and mobile browsers. When the application is running on IE9,
the HTML5 History API will not be used, and instead frontend routing will be done using hashbang url's.