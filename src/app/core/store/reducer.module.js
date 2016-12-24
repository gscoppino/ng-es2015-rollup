import angular from 'angular';

import RootReducerProviderService from './reducer.service.js';

/**
 * @namespace app/store/reducer
 * @desc Provides a singleton reducer which is a combination
 * of every reducer in the application.
 */
export default angular.module('app.store.reducer', [])
    .provider('rootReducer', RootReducerProviderService)
    .name;