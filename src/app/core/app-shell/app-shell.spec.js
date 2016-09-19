import angular from 'angular';
import AppShell from './app-shell';

beforeEach(angular.mock.module(AppShell));
describe('App Shell Component', () => {
    describe('View', () => {
        let $rootScope, $compile;
        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $compile = $injector.get('$compile');
        }));

        it('should compile.', () => {
            let scope = $rootScope.$new(),
                element = $compile('<app-shell></app-shell>')(scope);

            scope.$digest();
            expect(element.html().trim().length).toBeGreaterThan(0);
        });

        it('should be capable of transcluding content.', () => {
            let scope = $rootScope.$new(),
                element = $compile('<app-shell> <p>Sample Content</p> </app-shell>')(scope);

            scope.$digest();
            expect(element.html()).toMatch(/<p.*>Sample Content<\/p>/gi);
        });

        it('should signify that app shell decorations should be displayed, based on the value of "show-decorations".', () => {
            let scope = $rootScope.$new(),
                compiledElement = $compile('<app-shell show-decorations="showDecorations"></app-shell>'),
                linkedElement;

            scope.showDecorations = true;
            linkedElement = compiledElement(scope);
            scope.$digest();
            expect(linkedElement.find('div').hasClass('decorated')).toBe(true);

            scope.showDecorations = false;
            linkedElement = compiledElement(scope);
            scope.$digest();
            expect(linkedElement.find('div').hasClass('decorated')).not.toBe(true);
        });
    });
});