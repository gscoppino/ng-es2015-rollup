import angular from 'angular';
import template from './SampleComponent.html';

class SampleComponentController {
    static $inject = [];
    constructor() {}
}

const SampleComponentModule = angular
    .module('SampleComponent', [])
        .component('sampleComponent', {
            template: template,
            controller: SampleComponentController
        });

export default SampleComponentModule.name;