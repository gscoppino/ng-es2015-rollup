import angular from 'angular';

import { directiveNormalize } from 'app/common/utils/utils.js';

import LoaderSpinnerModule, { PROVIDERS as LoaderSpinnerProviders } from './loader-spinner.js';

beforeEach(angular.mock.module(LoaderSpinnerModule));
describe('Loader Spinner Component', () => {
    describe('View', () => {
        let $rootScope, $compile,
            tag = directiveNormalize(LoaderSpinnerProviders.LoaderSpinnerComponent);

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $compile = $injector.get('$compile');
        }));

        it('should compile.', () => {
            let scope = $rootScope.$new(),
                element = $compile(`<${tag}></${tag}>`)(scope);

            scope.$digest();
            expect(element.html().trim().length).toBeGreaterThan(0);
        });
    });
});