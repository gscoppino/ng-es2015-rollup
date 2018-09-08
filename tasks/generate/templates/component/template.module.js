import angular from 'angular';

import { <%= UpperCamelCaseName %>Component } from './<%= name %>.component.js';

export const <%= UpperCamelCaseName %>ComponentModule = angular
    .module('app.components.<%= name %>', [])
    .component('<%= lowerCamelCaseName %>', <%= UpperCamelCaseName %>Component)
    .name;
