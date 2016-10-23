import angular from 'angular';
import ApiFactory from 'app/core/api/factory/factory';

UserService.$inject = ['ApiFactory'];
function UserService(ApiFactory) {
    return ApiFactory.create('users');
}

export default angular.module('app.api.services.users', [ApiFactory])
    .factory('UserService', UserService)
    .name;