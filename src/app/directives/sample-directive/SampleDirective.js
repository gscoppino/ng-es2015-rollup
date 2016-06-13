import angular from 'angular';
import SampleService from 'app/services/SampleService/SampleService';

const SampleDirective = (SampleService) => ({
    restrict: 'A',
    link: function (scope, element) {
        SampleService.log();
        element.prepend('<div>Sample Text</div>');
    }
});

export default angular.module('app.directives.sample', [SampleService])
    .directive('sampleDirective', SampleDirective)
    .name;
