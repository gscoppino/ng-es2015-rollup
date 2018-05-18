import angular from 'angular';
import UIRouterModule from '@uirouter/angularjs';

RouterConfig.$inject = ['$locationProvider', '$stateProvider', '$urlServiceProvider'];
/**
 * @memberof module:RoutesModule
 * @description Attempt to use HTML5 History API for routing, if available.
 *   Otherwise, route using hashbangs.
 */
function RouterConfig($locationProvider, $stateProvider, $urlServiceProvider) {
    // NOTE: HTML5 mode requires proper server side configuration.
    // NOTE: HTML5 mode requires the existence of a <base> tag in HTML.
    $locationProvider.html5Mode(true);

    $stateProvider.state('app', {
        url: '/',
        template: '<h1>App</h1>'
    });

    $urlServiceProvider.rules.otherwise({ state: 'app' });
}

export { RouterConfig };

/**
 * @module RoutesModule
 * @description Configures the frontend routing.
 */
export default angular.module('app.routes', [
    UIRouterModule
])
    .config(RouterConfig)
    .name;
