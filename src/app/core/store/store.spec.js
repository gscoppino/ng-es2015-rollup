import angular from 'angular';
import { StoreConfig } from './store';

describe('Store Configuration', () => {
    let mockReduxProvider = {},
        mockRootReducerProvider = {},
        reducerStub = function(){};

    beforeEach(() => {
        mockReduxProvider.createStoreWith = jasmine.createSpy().and.callFake(angular.noop);
        mockRootReducerProvider.createReducer = jasmine.createSpy().and.returnValue(reducerStub);
    });

    it('should create the store correctly.', () => {
        StoreConfig(mockReduxProvider, mockRootReducerProvider);
        expect(mockReduxProvider.createStoreWith).toHaveBeenCalledWith(reducerStub, jasmine.any(Array));
    });
});