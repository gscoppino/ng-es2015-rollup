import angular from 'angular';
import UIRouterModule from '@uirouter/angularjs';

RouterConfig.$inject = ['$locationProvider', '$urlServiceProvider'];
/**
 * @memberof module:RouterConfigModule
 * @description Attempt to use HTML5 History API for routing, if available.
 *   Otherwise, route using hashbangs.
 */
function RouterConfig($locationProvider, $urlServiceProvider) {
    // NOTE: HTML5 mode requires proper server side configuration.
    // NOTE: HTML5 mode requires the existence of a <base> tag in HTML.
    $locationProvider.html5Mode(true);

    $urlServiceProvider.rules.otherwise({ state: 'app' });
}

export { RouterConfig };

/**
 * @module RouterConfigModule
 * @description Configures the frontend routing.
 */
export default angular.module('app.config.routes', [
    UIRouterModule
])
    .config(RouterConfig)
    .name;
