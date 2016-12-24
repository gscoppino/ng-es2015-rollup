import angular from 'angular';

import ApiFactoryModule from 'app/common/services/ApiFactory/ApiFactory.module.js';

import UserService from './users.service.js';

export default angular.module('app.api.services.users', [
    ApiFactoryModule
])
    .factory('UserService', UserService)
    .name;