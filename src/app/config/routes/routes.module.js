import angular from 'angular';

import UIRouterModule from '@uirouter/angularjs';

RouterConfig.$inject = ['$locationProvider', '$urlServiceProvider'];
/**
 * @type {angular.Config}
 * @desc Attempt to use HTML5 History API for routing, if available.
 *   Otherwise, route using hashbangs.
 */
function RouterConfig($locationProvider, $urlServiceProvider) {
    // NOTE: HTML5 mode requires proper server side configuration.
    // NOTE: HTML5 mode requires the existence of a <base> tag in HTML.
    $locationProvider.html5Mode(true);

    $urlServiceProvider.rules.otherwise({ state: 'app' });
}

/**
 * @type {angular.Module}
 * @desc Configures the frontend routing.
 */
export const RouterConfigModule = angular
    .module('app.config.routes', [
        UIRouterModule
    ])
    .config(RouterConfig)
    .name;

export { RouterConfig };
