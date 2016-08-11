import angular from 'angular';
import SampleService, { SampleServiceInjectable } from 'app/common/services/SampleService/SampleService';

sampleDirective.$inject = [SampleServiceInjectable];
function sampleDirective(SampleService) {
    return {
        restrict: 'A',
        link: function (scope, element) {
            SampleService.log();
            element.prepend('<div>Sample Text</div>');
        }
    };
}
const { name: SampleDirectiveInjectable } = sampleDirective;

export { SampleDirectiveInjectable };
export default angular.module('app.directives.sample-directive', [SampleService])
    .directive(SampleDirectiveInjectable, sampleDirective)
    .name;
