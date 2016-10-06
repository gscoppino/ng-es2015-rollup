import angular from 'angular';
import UsersListItemComponent from './users-list-item';

beforeEach(angular.mock.module(UsersListItemComponent));

describe('users-list-item', () => {
    describe('Component', () => {
        let $rootScope, $compile;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $compile = $injector.get('$compile');
        }));

        it('should compile and link successfully.', () => {
            let scope = $rootScope.$new(),
                element = $compile('<users-list-item></users-list-item>')(scope);

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
            let UserController;

            it('should set dependencies on the instance object.', () => {
                spyOn(Object, 'assign').and.callFake(angular.noop);

                UserController = $componentController('usersListItem');
                expect(Object.assign).toHaveBeenCalledWith(UserController, jasmine.any(Object));
            });
        });

        describe('Methods', () => {});
    });
});
