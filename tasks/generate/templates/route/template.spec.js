import angular from 'angular';

import { <%= UpperCamelCaseName %>RouterModule } from './<%= name %>.module.js';

beforeEach(angular.mock.module(<%= UpperCamelCaseName %>RouterModule));

describe('<%= name %>', () => {
    describe('Component', () => {
        let $rootScope, $compile;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $compile = $injector.get('$compile');
        }));

        it('should compile and link successfully.', () => {
            let scope = $rootScope.$new(),
                element = $compile('<<%= name %>></<%= name %>>')(scope);

            scope.$digest();
            expect(element).toBeDefined();
        });
    });

    describe('Controller', () => {
        let $componentController;

        beforeEach(angular.mock.inject(($injector) => {
            $componentController = $injector.get('$componentController');
        }));

        describe('Constructor', () => {
            let <%= UpperCamelCaseName %>Controller;

            it('should set dependencies on the instance object.', () => {
                spyOn(Object, 'assign').and.callFake(angular.noop);

                <%= UpperCamelCaseName %>Controller = $componentController('<%= lowerCamelCaseName %>');
                expect(Object.assign).toHaveBeenCalledWith(<%= UpperCamelCaseName %>Controller, {});
            });
        });

        describe('Methods', () => {});
    });
});
