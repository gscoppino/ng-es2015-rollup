import angular from 'angular';
import UIRouterModule from '@uirouter/angularjs';

import ConfigModule from 'app/config/config.module.js';
import AppRouterModule from 'app/routes/app/app.module.js';
import LoaderSpinnerModule from 'app/components/loader-spinner/loader-spinner.module.js';

import AppComponentTemplate from './app.component.html';
import AppComponent from './app.component.js';

/**
 * @module AppModule
 * @requires ConfigModule
 * @requires AppRouterModule
 * @requires LoaderSpinnerModule
 * @description Provides the root component of the application and
 *   initializes all other needed modules for the application.
 */
export default angular.module('app', [
    UIRouterModule,
    ConfigModule,
    AppRouterModule,
    LoaderSpinnerModule
])
    .component('app', Object.assign({ template: AppComponentTemplate }, AppComponent))
    .name;
