import angular from 'angular';

import { <%= UpperCamelCaseName %>Directive } from './<%= name %>.directive.js';

export const <%= UpperCamelCaseName %>DirectiveModule = angular
    .module('app.directives.<%= name %>', [])
    .directive('<%= lowerCamelCaseName %>', <%= UpperCamelCaseName %>Directive)
    .name;
