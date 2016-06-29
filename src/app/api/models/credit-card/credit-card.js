import angular from 'angular';
import Models from 'app/api/models/models';

class CreditCard {
    static $inject = ['Models'];

    constructor(Models) {
        return Models.create('credit-card');
    }
}

export default angular.module('api.models.credit-card', [Models])
    .service('CreditCard', CreditCard)
    .name;
