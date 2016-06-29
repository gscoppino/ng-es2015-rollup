import angular from 'angular';
import Models from 'app/api/models/models';

class User_CreditCard {
    static $inject = ['Models'];

    constructor(Models) {
        return Models.nestedCreate('users', 'card');
    }
}

export default angular.module('api.models.user.credit-card', [Models])
    .service('User_CreditCard', User_CreditCard)
    .name;
