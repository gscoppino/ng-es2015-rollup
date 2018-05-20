import angular from 'angular';
import { <%= UpperCamelCaseName %>Service } from '<%= name %>.service.js';

export const <%= UpperCamelCaseName %>Module = angular
    .module('app.services.<%= name %>', [])
    .service('<%= UpperCamelCaseName %>Service', <%= UpperCamelCaseName %>Service)
    .name;
