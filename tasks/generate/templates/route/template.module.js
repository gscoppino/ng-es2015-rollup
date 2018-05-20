import angular from 'angular';
import { <%= UpperCamelCaseName %>Component } from './<%= name %>.component.js';

RouterConfig.$inject = ['$stateProvider'];
/**
 * @memberof module:<%= UpperCamelCaseName %>RouterModule
 * @description Configure the UI router state.
 */
function RouterConfig($stateProvider) {
    $stateProvider.state('<%= name %>', {
        url: '/<%= name %>',
        component: '<%= lowerCamelCaseName %>'
    });
}

export { RouterConfig };

/**
 * @module <%= UpperCamelCaseName %>RouterModule
 * @description Configures the frontend routing.
 */
export const <%= UpperCamelCaseName %>Module = angular
    .module('app.routes.<%= name %>', [])
	.config(RouterConfig)
    .component('<%= lowerCamelCaseName %>', <%= UpperCamelCaseName %>Component)
    .name;
