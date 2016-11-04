import angular from 'angular';
import RootReducer from './RootReducer';

beforeEach(angular.mock.module(RootReducer));

describe('RootReducer Provider', () => {
    let _rootReducerProvider_;

    beforeEach(angular.mock.module((rootReducerProvider) => {
        _rootReducerProvider_ = rootReducerProvider;
    }));

    // Needed for the module to be instantiated
    beforeEach(angular.mock.inject());

    describe('createReducer', () => {
        it('should instantiate the root reducer and return it.', () => {
            let returnValue = _rootReducerProvider_.createReducer();
            expect(returnValue).toEqual(jasmine.any(Function));
        });

        it('should be a singleton.', () => {
            let returnValue1 = _rootReducerProvider_.createReducer();
            let returnValue2 = _rootReducerProvider_.createReducer();
            expect(returnValue1).toBe(returnValue2);
        });
    });

    describe('$get', () => {
        it('should return the reducer..', () => {
            spyOn(_rootReducerProvider_, 'createReducer').and.returnValue(angular.noop);
            let returnValue = _rootReducerProvider_.$get();
            expect(_rootReducerProvider_.createReducer).toHaveBeenCalled();
            expect(returnValue).toEqual(jasmine.any(Function));
        });
    });
});