/**
 * @module App
 * @requires module:App/Api
 * @requires module:App/Routes
 */

import angular from 'angular';
import Api from './api';
import Routes from './routes';

Run.$inject = ['$log'];
/** Logs a message to the logger. */
function Run ($log) {
    $log.log('Loaded!');
}

/**
 * Shim for AngularJS module system.
 * @see module:App/Api
 * @see module:App/Routes
 *
 */
const AppModule = angular
    .module('app', [Api, Routes])
        .run(Run);

export default AppModule.name;
