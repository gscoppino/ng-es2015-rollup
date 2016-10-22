import angular from 'angular';

class <%= name %>Service {

    static get $inject() { return []; }
    constructor() {
        Object.assign(this, {});
    }
}

export default angular.module('app.services.<%= name %>', [])
    .service('<%= name %>Service', <%= name %>Service)
    .name;
