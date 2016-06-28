import angular from 'angular';
import SampleService, { SampleServiceInjectable } from 'app/common/services/SampleService/SampleService';

function SampleDirective(SampleService) {
    'ngInject';

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
