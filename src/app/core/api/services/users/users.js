import angular from 'angular';
import Restangular from 'restangular-umd';
import Api from '../../api';

UserService.$inject = ['Restangular'];
function UserService(Restangular) {
    return Restangular.service('users');
}

export default angular.module('app.api.services.users', [Api, Restangular])
    .factory('UserService', UserService)
    .name;