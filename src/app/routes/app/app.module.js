import angular from 'angular';
import UIRouterModule from '@uirouter/angularjs';

import template from './app-shell.component.html';
import component from './app-shell.component.js';

RouterConfig.$inject = ['$stateProvider'];
/**
 * @memberof module:AppRouterModule
 * @description Configure the UI router state.
 */
function RouterConfig($stateProvider) {
    $stateProvider.state('app', {
        url: '/',
        component: 'appShell'
    });
}

export { RouterConfig };

/**
 * @module AppRouterModule
 * @description Configures the frontend routing.
 */
export default angular.module('app.routes.app', [
    UIRouterModule
])
    .config(RouterConfig)
    .component('appShell', Object.assign({ template }, component))
    .name;
