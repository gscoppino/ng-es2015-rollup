import angular from 'angular';
import SampleDirectiveModule from './SampleDirective';
import { SampleServiceInjectable } from 'app/services/SampleService/SampleService';

beforeEach(module(SampleDirectiveModule));

describe('SampleDirective', ()=> {
    let $rootScope, $compile, SampleService, element;

    beforeEach(inject(($injector) => {
        $rootScope = $injector.get('$rootScope');
        $compile = $injector.get('$compile');
        SampleService = $injector.get(SampleServiceInjectable);

        spyOn(SampleService, 'log').and.callFake(angular.noop);

        element = $compile('<div sample-directive></div>')($rootScope.$new());
        $rootScope.$digest();
    }));

    it('should log something.', () => {
        expect(SampleService.log).toHaveBeenCalled();
    });

    it('should have prepended to the element.', () => {
        let firstChildEl = element.children()[0];

        expect(firstChildEl.nodeName).toEqual('DIV');
        expect(firstChildEl.innerHTML).toEqual('Sample Text');
    });
});
