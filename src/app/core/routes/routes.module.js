import angular from 'angular';
import AngularRouteModule from 'angular-route';

import UsersListModule from 'app/common/components/users-list/users-list.module.js';

RouterConfig.$inject = ['$locationProvider', '$routeProvider'];
function RouterConfig($locationProvider, $routeProvider) {
    /*
     * Attempt to use HTML5 History API for routing, if available.
     * Otherwise, route using hashbangs.
     * NOTE: HTML5 mode requires proper server side configuration.
     * NOTE: HTML5 mode requires the existence of a <base> tag in HTML.
     */
    $locationProvider.html5Mode(true);

    $routeProvider.when('/', {
        template: `
            <h1>App</h1>
            <users-list></users-list>
        `
    });
}

export { RouterConfig };

/**
 * @namespace app/routes
 * @desc Configures the frontend routing.
 */
export default angular.module('app.routes', [
    AngularRouteModule,
    UsersListModule
])
    .config(RouterConfig)
    .name;
