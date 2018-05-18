import angular from 'angular';
import service from '<%= name %>.service.js';

export default angular.module('app.services.<%= name %>', [])
    .service('<%= UpperCamelCaseName %>Service', service)
    .name;
