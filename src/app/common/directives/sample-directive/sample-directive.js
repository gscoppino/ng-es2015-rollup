import angular from 'angular';

import SampleService from 'app/common/services/SampleService/SampleService.js';

sampleDirective.$inject = ['SampleService'];
function sampleDirective(SampleService) {
    return {
        restrict: 'A',
        link: function (scope, element) {
            SampleService.log();
            element.prepend('<div>Sample Text</div>');
        }
    };
}

export default angular.module('app.directives.sample-directive', [SampleService])
    .directive('sampleDirective', sampleDirective)
    .name;
