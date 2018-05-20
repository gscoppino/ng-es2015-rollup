import angular from 'angular';

import { <%= UpperCamelCaseName %>Module } from './<%= name %>.module.js';

beforeEach(angular.mock.module(<%= UpperCamelCaseName %>Module));

describe('<%= name %>', ()=> {
    let $rootScope, $compile, element;

    beforeEach(angular.mock.inject(($injector) => {
        $rootScope = $injector.get('$rootScope');
        $compile = $injector.get('$compile');

        element = $compile('<div <%= name %>></<%= name %>>')($rootScope.$new());
        $rootScope.$digest();
    }));
});
