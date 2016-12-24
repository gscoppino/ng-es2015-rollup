import angular from 'angular';
import NgReduxModule from 'ng-redux';

import UserServiceModule from 'app/core/api/services/users/users.module.js';

import UserActionsService from './actions.service.js';

export default angular.module('app.store.action-creators.users', [
    NgReduxModule,
    UserServiceModule
])
    .service('UserActions', UserActionsService)
    .name;
