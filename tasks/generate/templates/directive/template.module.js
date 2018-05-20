import angular from 'angular';
import { <%= UpperCamelCaseName %>Directive } from './<%= name %>.directive.js';

export const <%= UpperCamelCaseName %>Module = angular
    .module('app.directives.<%= name %>', [])
    .directive('<%= lowerCamelCaseName %>', <%= UpperCamelCaseName %>Directive)
    .name;
