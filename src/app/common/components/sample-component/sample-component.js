import angular from 'angular';

import template from './sample-component.html';

class SampleComponentController {
    static get $inject() { return []; }
    static get bindings() {
        return {
            input1: '<',
            input2: '@',
            output1: '&'
        };
    }

    constructor() {}
    $onInit() {}
    $onChanges() {}
    $doCheck() {}
    $onDestroy() {}
    $postLink() {}
}

const SampleComponentTag = 'sampleComponent',
    SampleComponent = {
        template,
        controller: SampleComponentController,
        bindings: SampleComponentController.bindings
    };

export { SampleComponentTag };
export default angular.module('app.components.sample-component', [])
    .component(SampleComponentTag, SampleComponent)
    .name;
