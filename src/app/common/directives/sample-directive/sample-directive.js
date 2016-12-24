import angular from 'angular';

import SampleServiceModule from 'app/common/services/SampleService/SampleService.js';

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

export default angular.module('app.directives.sample-directive', [SampleServiceModule])
    .directive('sampleDirective', sampleDirective)
    .name;
