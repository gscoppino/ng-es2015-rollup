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

const SampleComponent = angular.module('app.components.sample', [])
    .component('sampleComponent', {
        template,
        controller: SampleComponentController,
        bindings: SampleComponentController.bindings
    });

export default SampleComponent.name;
