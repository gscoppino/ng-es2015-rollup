/** @module App/Routes */

import angular from 'angular';

RouterConfig.$inject = ['$locationProvider'];
/**
 * Configure how the Angular $location service handles routing.
 */
function RouterConfig($locationProvider) {
    /*
     * Attempt to use HTML5 History API for routing, if available.
     * Otherwise, route using hashbangs.
     * NOTE: HTML5 mode requires proper server side configuration.
     * NOTE: HTML5 mode requires the existence of a <base> tag in HTML.
     */
    $locationProvider.html5Mode(true);
}

const RouterModule = angular
    .module('app.routes', [])
    .config(RouterConfig);

export default RouterModule.name;
