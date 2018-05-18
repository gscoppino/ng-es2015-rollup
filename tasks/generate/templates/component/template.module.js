import angular from 'angular';

import template from './<%= name %>.component.html';
import component from './<%= name %>.component.js';

export default angular.module('app.components.<%= name %>', [])
    .component('<%= lowerCamelCaseName %>', Object.assign({ template }, component))
    .name;
