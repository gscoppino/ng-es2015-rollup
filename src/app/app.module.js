import angular from 'angular';
import AngularRouteModule from 'angular-route';

import ConfigModule from 'app/core/config/config.module.js';
import ApiModule from 'app/core/api/api.module.js';
import StoreModule from 'app/core/store/store.module.js';
import RoutesModule from 'app/core/routes/routes.module.js';
import LoaderSpinnerModule from 'app/common/components/loader-spinner/loader-spinner.module.js';
import UsersListModule from 'app/common/components/users-list/users-list.module.js';

import AppComponentTemplate from './app.component.html';
import AppComponent from './app.component.js';

/**
 * @namespace app
 * @desc The root module of the application.
 */
export default angular.module('app', [
    AngularRouteModule,
    ConfigModule,
    ApiModule,
    StoreModule,
    RoutesModule,
    LoaderSpinnerModule,
    UsersListModule
])
    .component('app', Object.assign({ template: AppComponentTemplate }, AppComponent))
    .name;
