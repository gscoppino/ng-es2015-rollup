import angular from 'angular';
import <%= name %>Service, { <%= name %>ServiceInjectable } from './<%= name %>';

beforeEach(angular.mock.module(<%= name %>Service));

describe('<%= name %>Service', () => {

    beforeEach(angular.mock.inject(($injector) => {
    }));

    describe('Constructor', () => {
        let <%= name %>Service;

        it('should set dependencies on the instance object.', angular.mock.inject(($injector) => {
            spyOn(Object, 'assign').and.callFake(angular.noop);
            
            <%= name %>Service = $injector.get(<%= name %>ServiceInjectable);
            expect(Object.assign).toHaveBeenCalledWith(<%= name %>Service, {});
        }));
    });

    describe('Methods', () => {});
});
