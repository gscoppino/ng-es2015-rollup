import angular from 'angular';
import SampleService from 'app/services/SampleService/SampleService';

const SampleDirective = angular.module('app.directives.sample', [SampleService])
    .directive('sampleDirective', (SampleService)=> {
        return {
            restrict: 'A',
            link: function (scope, element) {
                SampleService.log();
                element.prepend('<div>Sample Text</div>');
            }
        };
    });

export default SampleDirective.name;
