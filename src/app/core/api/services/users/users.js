import angular from 'angular';
import Api from 'app/core/api/api';

UserService.$inject = ['Restangular'];
function UserService(Restangular) {
    return Restangular.service('users');
}

export default angular.module('app.api.services.users', [Api])
    .factory('UserService', UserService)
    .name;