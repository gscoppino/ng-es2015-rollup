import angular from 'angular';
import UIRouterModule from '@uirouter/angularjs';

RouterConfig.$inject = ['$stateProvider'];
/**
 * @memberof module:RoutesModule
 * @description Attempt to use HTML5 History API for routing, if available.
 *   Otherwise, route using hashbangs.
 */
function RouterConfig($stateProvider) {
    $stateProvider.state('app', {
        url: '/',
        template: '<h1>App</h1>'
    });
}

export { RouterConfig };

/**
 * @module RoutesModule
 * @description Configures the frontend routing.
 */
export default angular.module('app.routes.app', [
    UIRouterModule
])
    .config(RouterConfig)
    .name;
