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
 * @desc Provides the application shell component and configures the router
 *   to render the application shell when the correct URL is active.
 */
export const AppRouterModule = angular
    .module('app.routes.app', [
        UIRouterModule
    ])
    .config(RouterConfig)
    .component('appShell', AppShellComponent)
    .name;
