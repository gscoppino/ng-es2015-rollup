import angular from 'angular';
import { <%= UpperCamelCaseName %>Component } from './<%= name %>.component.js';

export const <%= UpperCamelCaseName %>Module = angular
    .module('app.components.<%= name %>', [])
    .component('<%= lowerCamelCaseName %>', <%= UpperCamelCaseName %>Component)
    .name;
