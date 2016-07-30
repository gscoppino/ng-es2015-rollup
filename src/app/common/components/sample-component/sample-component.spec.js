import angular from 'angular';
import SampleComponentModule from './sample-component';

beforeEach(angular.mock.module(SampleComponentModule));

describe('sample-component', () => {
    describe('View', () => {
        let $rootScope, $compile;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $compile = $injector.get('$compile');
        }));

        it('should compile.', () => {
            let scope = $rootScope.$new(),
                element = $compile('<sample-component></sample-component>')(scope);

            scope.$digest();
            expect(element.html()).toEqual('Sample Text');
        });
    });
});
