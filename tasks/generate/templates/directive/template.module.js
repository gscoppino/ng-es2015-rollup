import angular from 'angular';
import directive from './<%= name %>.directive.js';

export default angular.module('app.directives.<%= name %>', [])
    .directive('<%= lowerCamelCaseName %>', directive)
    .name;
