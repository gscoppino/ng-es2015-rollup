import angular from 'angular';
import ApiFactory from 'app/common/services/ApiFactory/ApiFactory';

UserService.$inject = ['ApiFactory'];
function UserService(ApiFactory) {
    return ApiFactory.create('users');
}

export default angular.module('app.api.services.users', [ApiFactory])
    .factory('UserService', UserService)
    .name;