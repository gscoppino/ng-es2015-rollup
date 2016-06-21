import angular from 'angular';
import SampleService, { SampleServiceInjectable } from 'app/common/services/SampleService/SampleService';

SampleDirective.$inject = [SampleServiceInjectable];
function SampleDirective(SampleService) {
    return {
        restrict: 'A',
        link: function (scope, element) {
            SampleService.log();
            element.prepend('<div>Sample Text</div>');
        }
    };
}

export default angular.module('app.directives.sample', [SampleService])
    .directive('sampleDirective', SampleDirective)
    .name;
