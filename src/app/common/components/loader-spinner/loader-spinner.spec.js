import angular from 'angular';
import LoaderSpinner from './loader-spinner.js';

beforeEach(angular.mock.module(LoaderSpinner));
describe('Loader Spinner Component', () => {
    describe('View', () => {
        let $rootScope, $compile;
        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $compile = $injector.get('$compile');
        }));

        it('should compile.', () => {
            let scope = $rootScope.$new(),
                element = $compile('<loader-spinner></loader-spinner>')(scope);

            scope.$digest();
            expect(element.html().trim().length).toBeGreaterThan(0);
        });
    });
});