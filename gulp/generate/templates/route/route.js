import angular from 'angular';
import <%= UpperCamelCaseName %>Template from './<%= name %>';

class <%= UpperCamelCaseName %>Controller {
    static get $inject() { return []; }
    constructor() {
        Object.assign(this, {});
    }

    static get bindings() {
        return {};
    }
    $onInit() {}

    $onChanges(changes) {}

    $doCheck() {}

    $onDestroy() {}

    $postLink() {}
}

const <%= UpperCamelCaseName %>ComponentInjectable = '<%= lowerCamelCaseName %>',
    <%= UpperCamelCaseName %>Component = {
        template: <%= UpperCamelCaseName %>Template,
        controller: <%= UpperCamelCaseName %>Controller
        bindings: <%= UpperCamelCaseName %>Controller.bindings
    };

createComponentRoute.$inject = ['$stateProvider'];
function createComponentRoute($stateProvider) {
    $stateProvider.state('<%= name %>', {
        url: '/<%= name %>',
        resolve: {},
        template: '<<%= name %></<%= name %>>'
    });
}

export { <%= UpperCamelCaseName %>ComponentInjectable };
export { <%= name %> as <%= UpperCamelCaseName %>ComponentRoute };
export default angular.module('app.components.<%= name %>', [])
    .component(<%= UpperCamelCaseName %>ComponentInjectable, <%= UpperCamelCaseName %>Component)
    .config(createComponentRoute)
    .name;
