import angular from 'angular';

import { <%= UpperCamelCaseName %>DirectiveModule } from './<%= name %>.module.js';

beforeEach(angular.mock.module(<%= UpperCamelCaseName %>DirectiveModule));

describe('<%= name %>', ()=> {
    let $rootScope, $compile, element;

    beforeEach(angular.mock.inject(($injector) => {
        $rootScope = $injector.get('$rootScope');
        $compile = $injector.get('$compile');

        element = $compile('<div <%= name %>></<%= name %>>')($rootScope.$new());
        $rootScope.$digest();
    }));
});
