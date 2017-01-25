import angular from 'angular';
import NgReduxModule from 'ng-redux';
import createLogger from 'redux-logger';

import $ngReduxImmutableDecorator from './store.decorator.js';
import RootReducerModule from './reducer.module.js';

StoreConfig.$inject = ['$ngReduxProvider', 'rootReducerProvider'];
function StoreConfig($ngReduxProvider, rootReducerProvider) {
    let rootReducer = rootReducerProvider.createReducer();
    let middlewares = [
        createLogger({ level: 'info', collapsed: true })
    ];

    $ngReduxProvider.createStoreWith(rootReducer, middlewares);
}

export { $ngReduxImmutableDecorator, StoreConfig };
/**
 * @namespace app/store
 * @desc Configures the frontend singleton store with its
 * reducers and middlewares.
 */
export default angular.module('app.store', [
    NgReduxModule,
    RootReducerModule
])
    .config(StoreConfig)
    .decorator('$ngRedux', $ngReduxImmutableDecorator)
    .name;
