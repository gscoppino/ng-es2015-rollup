import angular from 'angular';
import AngularRoute from 'angular-route';

import StyleguideComponentTemplate from './styleguide.component.html';
import StyleguideComponent from './styleguide.component.js';

StyleguideRouterConfig.$inject = ['$routeProvider'];
function StyleguideRouterConfig($routeProvider) {
    $routeProvider.when('/styleguide', {
        template: '<styleguide></styleguide>'
    });
}

export default angular.module('styleguide', [
    AngularRoute
])
    .config(StyleguideRouterConfig)
    .component('styleguide', Object.assign({ template: StyleguideComponentTemplate }, StyleguideComponent))
    .name;
