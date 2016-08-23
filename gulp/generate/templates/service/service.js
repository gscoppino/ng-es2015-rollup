import angular from 'angular';

class <%= name %>Service {
    static get $inject() { return []; }
    constructor() {
        Object.assign(this, {});
    }
}
const { name: <%= name %>ServiceInjectable } = <%= name %>Service;

export { <%= name %>ServiceInjectable };
export default angular.module('app.services.<%= name %>', [])
    .service(<%= name %>ServiceInjectable, <%= name %>Service)
    .name;
