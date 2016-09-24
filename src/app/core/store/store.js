import angular from 'angular';
import ngRedux from 'ng-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';

StoreConfig.$inject = ['$ngReduxProvider'];
function StoreConfig($ngReduxProvider) {
    let middlewares = [
        thunk,
        createLogger({ level: 'info', collapsed: true })
    ];

    $ngReduxProvider.createStoreWith(rootReducer, middlewares);
}

export default angular.module('app.store', [ngRedux])
    .config(StoreConfig)
    .name;