import angular from 'angular';
import ngRedux from 'ng-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import RootReducer from './reducers/RootReducer';

function immutable(mutable) {
    return JSON.parse(JSON.stringify(mutable));
}

StoreConfig.$inject = ['$ngReduxProvider', 'rootReducerProvider'];
function StoreConfig($ngReduxProvider, rootReducerProvider) {
    let rootReducer = rootReducerProvider.createReducer();
    let middlewares = [
        thunk,
        createLogger({ level: 'info', collapsed: true })
    ];

    $ngReduxProvider.createStoreWith(rootReducer, middlewares);
}

$ngReduxImmutableDecorator.$inject = ['$delegate'];
function $ngReduxImmutableDecorator($delegate) {
    $delegate.getStateUnsafe = $delegate.getState;

    $delegate.getState = (stateFn) => immutable(stateFn($delegate.getStateUnsafe()));

    return $delegate;
}

export { immutable, $ngReduxImmutableDecorator, StoreConfig };
/**
 * @namespace app/store
 * @desc Configures the frontend singleton store with its
 * reducers and middlewares.
 */
export default angular.module('app.store', [ngRedux, RootReducer])
    .config(StoreConfig)
    .decorator('$ngRedux', $ngReduxImmutableDecorator)
    .name;