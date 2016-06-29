import angular from 'angular';
import Models from 'app/api/models/models';

class Users {
    static $inject = ['Models'];

    constructor(Models) {
        return Models.create('users', {
            nestedResources: ['card'],
            nestedEndpoints: ['current']
        });
    }
}

export default angular.module('api.models.user', [Models])
    .service('Users', Users)
    .name;
