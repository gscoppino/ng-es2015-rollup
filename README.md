Boilerplate for developing a new AngularJS 1.x single page application.

[![Build Status](https://travis-ci.org/gscoppino/ng-modern-boilerplate.svg?branch=master)](https://travis-ci.org/gscoppino/ng-modern-boilerplate)
[![Coverage Status](https://coveralls.io/repos/github/gscoppino/ng-modern-boilerplate/badge.svg?branch=master)](https://coveralls.io/github/gscoppino/ng-modern-boilerplate?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/gscoppino/ng-modern-boilerplate.svg)](https://greenkeeper.io/)

Contents:
* Core skeleton of an Angular application using component architecture, with accessibility addressed by [ngAria](https://angularjs.org/).
* Unit test environment with code coverage in place via [Karma](https://karma-runner.github.io/1.0/index.html)+
[Jasmine](http://jasmine.github.io/)+[Istanbul](http://gotwarlost.github.io/istanbul/)+
[Puppeteer](https://developers.google.com/web/tools/puppeteer/), with boilerplate at 100% test coverage.
* Integration test environment via [Protractor](http://www.protractortest.org/)+[Jasmine](http://jasmine.github.io/).
* Linting of CSS and Javascript in place, using [Stylelint](http://stylelint.io/) for the former, and [ESLint](http://eslint.org/) for the latter. Sensible defaults
in place through `stylelint-config-standard` and `eslint:recommended` presets, respectively.
* Automatic generation of app documentation available via [ESDoc](https://esdoc.org/).
* Offline support via [sw-precache](https://github.com/GoogleChrome/sw-precache).
* Development server provided using [BrowserSync](https://www.browsersync.io/), allowing for simultaneous multi-device runtime testing. Supports use of HTML5 History API
for frontend routing, and incremental builds (LiveReload). Can also simulate a production server by minifying assets and inlining critical HTML and CSS.

Features:
* Modern Javascript. Everywhere. Write source code, unit tests, and integration tests with up-to-date syntax and features,
import modules locally or from NPM using ES2015 `import` syntax, and get properly source-mapped code, documentation and coverage reports.
The build system, too, is written completely with support for up-to-date syntax and features. This is made possible thanks to [Webpack](https://webpack.github.io/),
[Rollup](https://rollupjs.org/) and [Babel](https://babeljs.io/). Webpack creates a bundle out of the tree of application imports, and Babel transpiles the source code
in the bundle to the correct format for the target environment. Webpack/Rollup allow for dynamic imports, which facilitates lazy loading.
* Inline Angular component templates made possible through Webpack [raw-loader](https://github.com/webpack/raw-loader). Just import your templates using ES2015 `import` syntax.
* Use future CSS features now. Write stylesheets using upcoming CSS features such as selector nesting, variables, and the latest CSS properties (without vendor prefixes).
Import your local CSS or CSS from NPM using spec-compliant `@import` syntax.  This is made possible using [PostCSS](http://postcss.org/), [CSSNext](http://cssnext.io/),
and [Autoprefixer](https://autoprefixer.github.io/). The CSS will be bundled to work in today's browsers (with customizable ranges).
* Supports backendless development (enabled by default). This is accomplished through the use of [ngMockE2E and $httpBackend](https://angularjs.org/).
* Generator scripts for scaffolding new directives, components, and services from the command line.

Compatibility:

Configurable, but by default targets: IE9+, and the last two versions of all mainstream desktop and mobile browsers. When the application is running on IE9,
the HTML5 History API will not be used, and instead frontend routing will be done using hashbang url's.
