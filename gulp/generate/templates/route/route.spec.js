import angular from 'angular';
import <%= UpperCamelCaseName %>Component, { <%= UpperCamelCaseName %>ComponentInjectable } from './<%= name %>';

beforeEach(angular.mock.module(<%= UpperCamelCaseName %>Component));

describe('<%= name %>', () => {
    describe('Component', () => {
        let $rootScope, $compile;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $compile = $injector.get('$compile');
        }));

        it('should compile.', () => {
            let scope = $rootScope.$new(),
                element = $compile('<%= name %>></<%= name %>>')(scope);

            scope.$digest();
            expect(element).toBeDefined();
        });
    });

    describe('Controller', () => {
        let $componentController, <%= UpperCamelCaseName %>Controller;

        beforeEach(angular.mock.inject(($injector) => {
            $componentController = $injector.get('$componentController');
        }));

        it('should set dependencies on the instance object.', () => {
            spyOn(Object, 'assign').and.callFake(angular.noop);
            <%= UpperCamelCaseName %>Controller = $componentController(UpperCamelCaseName %>ComponentInjectable);
            expect(Object.assign).toHaveBeenCalledWith(<%= UpperCamelCaseName %>Controller, {});
        });
    });

    describe('State', () => {
        let $state;

        beforeEach(inject(($injector) => {
            $state = $injector.get('$state');
        }));

        it('should define the state.', () => {
            expect($state.has('<%= name %>')).toBe(true);
        });
    });
});
