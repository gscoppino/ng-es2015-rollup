import <%= UpperCamelCaseName %>Template from './<%= name %>.component.html';

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

export const <%= UpperCamelCaseName %>Component = {
    template: <%= UpperCamelCaseName %>Template,
    controller: <%= UpperCamelCaseName %>Controller,
    bindings: <%= UpperCamelCaseName %>Controller.bindings
};

export { <%= UpperCamelCaseName %>Template };
export { <%= UpperCamelCaseName %>Controller };
