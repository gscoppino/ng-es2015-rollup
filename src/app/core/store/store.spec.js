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
    let mockGetStateFn = function () { return this.state; };
    let mockSubscribeFn = function () {};

    beforeEach(() => {
        mock_$ngRedux = {
            state: {
                slice: Immutable.from({
                    listField: Immutable.from([])
                })
            },
            getState: mockGetStateFn,
            subscribe: mockSubscribeFn
        };
    });

    describe('getState', () => {

        it('should have the original implementation exposed as $ngRedux.getStateUnsafe.', () => {
            const $ngRedux = $ngReduxImmutableDecorator(mock_$ngRedux);

            expect($ngRedux.getStateUnsafe).toBe(mockGetStateFn);
        });

        it(`should override the original implementation with a function that returns the state immutably,
        and accepts a callback to return a specific part of the state.`, () => {
            const $ngRedux = $ngReduxImmutableDecorator(mock_$ngRedux);

            // Test that the original getState implementation is used
            // by the newly decorated function.
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

    describe('subscribe', () => {

        it('should have the original implementation exposed as $ngRedux.subscribeAll', () => {
            const $ngRedux = $ngReduxImmutableDecorator(mock_$ngRedux);

            expect($ngRedux.subscribeAll).toBe(mockSubscribeFn);
        });

        it(`should override the original implementation with a function that accepts a callback to return a specific
        part of the state, and accepts a callback to call when that part of the state changes.`, () => {
            const $ngRedux = $ngReduxImmutableDecorator(mock_$ngRedux),
                sliceFn = function (state) { return state.slice; };

            var deregisterFn;

            spyOn($ngRedux, 'subscribeAll').and.returnValue(angular.noop);

            // Test that a subscription is not created if no callback is provided
            deregisterFn = $ngRedux.subscribe();
            expect($ngRedux.subscribeAll).not.toHaveBeenCalled();
            expect(deregisterFn).not.toBeDefined();

            $ngRedux.subscribeAll.calls.reset();

            // Test that a subscription is created if a subscription callback is provided,
            // and that the callback is passed directly to the original subscribe implementation.
            deregisterFn = $ngRedux.subscribe(angular.noop);
            expect($ngRedux.subscribeAll).toHaveBeenCalledWith(angular.noop);
            expect(deregisterFn).toBe(angular.noop);

            $ngRedux.subscribeAll.calls.reset();

            // Test that a subscription is created when both callbacks are provided, but that
            // the given subscription callback is not passed directly to subscribe implementation, as
            // it is to be invoked manually by an anonymous subscription callback.
            deregisterFn = $ngRedux.subscribe(sliceFn, angular.noop);
            expect($ngRedux.subscribeAll).not.toHaveBeenCalledWith(angular.noop);
            expect($ngRedux.subscribeAll).not.toHaveBeenCalledWith(sliceFn);
            expect($ngRedux.subscribeAll).toHaveBeenCalledWith(jasmine.any(Function)); // Any other function
            expect(deregisterFn).toBe(angular.noop);
        });

        it(`should call the subscription callback only if the value returned by the state callback has changed
        since the last check.`, () => {
            const $ngRedux = $ngReduxImmutableDecorator(mock_$ngRedux);

            // Stub out the original subscribe implementation, and store the anonymous
            // callback that would have been provided to it in a variable so that it can
            // be called arbitrarily and spied on.
            var internalCallback;
            spyOn($ngRedux, 'subscribeAll').and.callFake(cb => {
                internalCallback = jasmine.createSpy().and.callFake(cb);
            });

            // Add a spy function to represent the user provided callback
            // function, which will also test that the data provided
            // to the subscriber is correct (equal by value to the store state,
            // but not by reference).
            const subscriberCallback = jasmine.createSpy().and.callFake(slice => {
                expect(slice).toEqual($ngRedux.getStateUnsafe().slice);
                expect(slice).not.toBe($ngRedux.getStateUnsafe().slice);
            });

            // Open a new subscription
            $ngRedux.subscribe(state => state.slice, subscriberCallback);

            // There should not be any calls at the time right after subscription
            expect(internalCallback).not.toHaveBeenCalled();
            expect(subscriberCallback).not.toHaveBeenCalled();

            // No changes, subscriber should not be notified
            internalCallback();
            expect(subscriberCallback).not.toHaveBeenCalled();

            // No reference change, subscriber should not be notified
            // as all updates to the store are done immutably
            $ngRedux.state = {
                slice: $ngRedux.getStateUnsafe().slice
            };

            internalCallback();
            expect(subscriberCallback).not.toHaveBeenCalled();

            // Reference change, subscriber should be notified.
            $ngRedux.state = {
                slice: {}
            };

            internalCallback();
            expect(subscriberCallback).toHaveBeenCalled();
        });

    });
});
