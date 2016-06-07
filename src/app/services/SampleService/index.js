/** @module App/Services/Sample */

import angular from 'angular';

import service from './service.js';

/**
 * Shim for AngularJS module system.
 * @see {@link module:SampleService|SampleService} for documentation on SampleService.
 */
const SampleService = angular.module('app.services.sample', [])
    .service('SampleService', service);

export default SampleService.name;
