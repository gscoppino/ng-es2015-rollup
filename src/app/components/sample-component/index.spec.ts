import SampleComponentModule from './index.ts';

beforeEach(module(SampleComponentModule));

describe('SampleComponent', () => {
    describe('Template', () => {
        let $rootScope, $compile;

        beforeEach(inject(($injector) => {
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
