import angular from 'angular';
import AddEditUserItemComponent from './add-edit-user-item.js';

beforeEach(angular.mock.module(AddEditUserItemComponent));

describe('add-edit-user-item', () => {
    describe('Component', () => {
        let $rootScope, $compile;

        beforeEach(angular.mock.inject(($injector) => {
            $rootScope = $injector.get('$rootScope');
            $compile = $injector.get('$compile');
        }));

        it('should compile and link successfully.', () => {
            let scope = $rootScope.$new(),
                element = $compile('<add-edit-user-item></add-edit-user-item>')(scope);

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
            let AddEditUserItemController;

            it('should set dependencies on the instance object.', () => {
                spyOn(Object, 'assign').and.callFake(angular.noop);

                AddEditUserItemController = $componentController('addEditUserItem');
                expect(Object.assign).toHaveBeenCalledWith(AddEditUserItemController, {});
            });
        });

        describe('Methods', () => {});
    });
});
