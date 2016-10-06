import angular from 'angular';
import UsersListComponent from './users-list';

beforeEach(angular.mock.module(UsersListComponent));

describe('users-list', () => {
    describe('Component', () => {
        let $rootScope, $compile;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $compile = $injector.get('$compile');
        }));

        it('should compile and link successfully.', () => {
            let scope = $rootScope.$new(),
                element = $compile('<users-list></users-list>')(scope);

            scope.$digest();
            expect(element).toBeDefined();
        });
    });

    describe('Controller', () => {
        let $componentController;

        beforeEach(angular.mock.inject(($injector) => {
            $componentController = $injector.get('$componentController');
        }));

        describe('Constructor', () => {
            let UsersListController;

            it('should set dependencies on the instance object.', () => {
                spyOn(Object, 'assign').and.callFake(angular.noop);

                UsersListController = $componentController('usersList');
                expect(Object.assign).toHaveBeenCalledWith(UsersListController, jasmine.any(Object));
            });
        });

        describe('Methods', () => {});
    });
});
