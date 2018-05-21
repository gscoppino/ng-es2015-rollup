import angular from 'angular';

import { <%= UpperCamelCaseName %>Module } from './<%= name %>.module.js';

beforeEach(angular.mock.module(<%= UpperCamelCaseName %>Module));

describe('<%= UpperCamelCaseName %>Service', () => {

    beforeEach(angular.mock.inject(($injector) => {
    }));

    describe('Constructor', () => {
        let <%= UpperCamelCaseName %>Service;

        it('should set dependencies on the instance object.', angular.mock.inject(($injector) => {
            spyOn(Object, 'assign').and.callFake(angular.noop);

            <%= UpperCamelCaseName %>Service = $injector.get('<%= UpperCamelCaseName %>Service');
            expect(Object.assign).toHaveBeenCalledWith(<%= name %>Service, {});
        }));
    });

    describe('Methods', () => {});
});
