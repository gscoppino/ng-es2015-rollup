import angular from 'angular';
import { static as Immutable } from 'seamless-immutable';
import { StoreConfig, $ngReduxImmutableDecorator } from './store.module.js';

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

describe('$ngRedux Decorator', () => {
    let mock_$ngRedux;
    let mockGetStateFn = function () { return this.state; }

    beforeEach(() => {
        mock_$ngRedux = {
            state: Immutable.from({
                slice: {
                    listField: []
                }
            }),
            getState: mockGetStateFn
        };
    });

    it(`should expose $ngRedux.getState as $ngRedux.getStateUnsafe.`, () => {
        const $ngRedux = $ngReduxImmutableDecorator(mock_$ngRedux);

        expect($ngRedux.getStateUnsafe).toBe(mockGetStateFn);
    });

    it(`should override the original $ngRedux.getState function with a function that returns the state immutably,
    and accepts a callback to return a specific part of the state.`, () => {
        const $ngRedux = $ngReduxImmutableDecorator(mock_$ngRedux);

        // Test that the original $ngRedux.getState is called
        spyOn($ngRedux, 'getStateUnsafe').and.callThrough();
        $ngRedux.getState();
        expect($ngRedux.getStateUnsafe).toHaveBeenCalled();

        // Test with no callback
        expect($ngRedux.getState()).toEqual(mock_$ngRedux.state);
        expect($ngRedux.getState()).not.toBe(mock_$ngRedux.state);
        expect($ngRedux.getState().slice).toEqual(mock_$ngRedux.state.slice);
        expect($ngRedux.getState().slice).not.toBe(mock_$ngRedux.state.slice);
        expect($ngRedux.getState().slice.listField).toEqual(mock_$ngRedux.state.slice.listField);
        expect($ngRedux.getState().slice.listField).not.toBe(mock_$ngRedux.state.slice.listField);

        // Test with callback
        expect($ngRedux.getState(state => state.slice)).toEqual(mock_$ngRedux.state.slice);
        expect($ngRedux.getState(state => state.slice)).not.toBe(mock_$ngRedux.state.slice);
        expect($ngRedux.getState(state => state.slice).listField).toEqual(mock_$ngRedux.state.slice.listField);
        expect($ngRedux.getState(state => state.slice).listField).not.toBe(mock_$ngRedux.state.slice.listField);
    });
});