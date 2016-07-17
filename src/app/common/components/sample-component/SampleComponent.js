import angular from 'angular';

import template from './SampleComponent.html';

class SampleComponentController {
    static $inject = [];

    static bindings = {
        input1: '<',
        input2: '@',
        output1: '&'
    };

    constructor() {}
    $onInit() {}
    $onChanges() {}
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
export default angular.module('app.components.sample', [])
    .component(SampleComponentTag, SampleComponent)
    .name;
