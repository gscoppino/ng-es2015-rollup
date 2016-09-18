/** @module app/routes/routes */
import angular from 'angular';
import UIRouter from 'angular-ui-router';

RouterConfig.$inject = ['$locationProvider'];
function RouterConfig($locationProvider) {
    /*
     * Attempt to use HTML5 History API for routing, if available.
     * Otherwise, route using hashbangs.
     * NOTE: HTML5 mode requires proper server side configuration.
     * NOTE: HTML5 mode requires the existence of a <base> tag in HTML.
     */
    $locationProvider.html5Mode(true);
}

/**
 * @member AppRoutingModule
 * @memberof module:app/routes/routes#
 * @desc Configures the frontend routing.
 */
export default angular.module('app.routes', [UIRouter])
    .config(RouterConfig)
    .name;
