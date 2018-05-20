import angular from 'angular';
import { SampleDirectiveModule } from './sample-directive.module.js';

beforeEach(angular.mock.module(SampleDirectiveModule));

describe('sample-directive', ()=> {
    let $rootScope, $compile, SampleService, element;

    beforeEach(angular.mock.inject(($injector) => {
        $rootScope = $injector.get('$rootScope');
        $compile = $injector.get('$compile');
        SampleService = $injector.get('SampleService');

        spyOn(SampleService, 'log').and.callFake(angular.noop);

        element = $compile('<div sample-directive></div>')($rootScope.$new());
        $rootScope.$digest();
    }));

    it('should log something using SampleService.', () => {
        expect(SampleService.log).toHaveBeenCalled();
    });

    it('should have prepended content to the element.', () => {
        let firstChildEl = element.children()[0];

        expect(firstChildEl.nodeName).toEqual('DIV');
        expect(firstChildEl.innerHTML).toEqual('Sample Text');
    });
});
