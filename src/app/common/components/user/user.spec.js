import angular from 'angular';
import UserComponent from './user';

beforeEach(angular.mock.module(UserComponent));

describe('user', () => {
    describe('Component', () => {
        let $rootScope, $compile;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $compile = $injector.get('$compile');
        }));

        it('should compile and link successfully.', () => {
            let scope = $rootScope.$new(),
                element = $compile('<user></user>')(scope);

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

                UserController = $componentController('user');
                expect(Object.assign).toHaveBeenCalledWith(UserController, {});
            });
        });

        describe('Methods', () => {});
    });
});
