import angular from 'angular';

import UIRouterModule from '@uirouter/angularjs';

import { AppShellComponent } from './app-shell.component.js';

RouterConfig.$inject = ['$stateProvider'];
/**
 * @type {angular.Config}
 * @desc Configure the UI router state.
 */
function RouterConfig($stateProvider) {
    $stateProvider.state('app', {
        url: '/',
        component: 'appShell'
    });
}

export { RouterConfig };

/**
 * @type {angular.Module}
 * @desc Configures the frontend routing.
 */
export const AppRouterModule = angular
    .module('app.routes.app', [
        UIRouterModule
    ])
    .config(RouterConfig)
    .component('appShell', AppShellComponent)
    .name;
