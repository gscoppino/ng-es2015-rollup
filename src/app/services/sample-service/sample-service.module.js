import angular from 'angular';
import { SampleService } from './sample-service.service.js';

export const SampleServiceModule = angular
    .module('app.services.sample-service', [])
    .service('SampleService', SampleService)
    .name;
