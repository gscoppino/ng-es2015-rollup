import angular from 'angular';
import <%= UpperCamelCaseName %>Template from './<%= name %>.html';

class <%= UpperCamelCaseName %>Controller {

    static get $inject() { return []; }
    constructor() {
        Object.assign(this, {});
    }

    $onInit() {}

    $onChanges(changes) {}

    $doCheck() {}

    $onDestroy() {}

    $postLink() {}
}

const <%= UpperCamelCaseName %>Component = {
    template: <%= UpperCamelCaseName %>Template,
    controller: <%= UpperCamelCaseName %>Controller
    bindings: {}
};

createComponentRoute.$inject = ['$stateProvider'];
function createComponentRoute($stateProvider) {
    $stateProvider.state('<%= name %>', {
        url: '/<%= name %>',
        resolve: {},
        template: '<<%= name %></<%= name %>>'
    });
}

export default angular.module('app.components.<%= name %>', [])
    .component('<%= lowerCamelCaseName %>', <%= UpperCamelCaseName %>Component)
    .config(createComponentRoute)
    .name;
