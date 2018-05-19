import angular from 'angular';
import UIRouterModule from '@uirouter/angularjs';

RouterConfig.$inject = ['$stateProvider'];
/**
 * @memberof module:AppRouterModule
 * @description Configure the UI router state.
 */
function RouterConfig($stateProvider) {
    $stateProvider.state('app', {
        url: '/',
        template: '<h1>App</h1>'
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
    .name;
