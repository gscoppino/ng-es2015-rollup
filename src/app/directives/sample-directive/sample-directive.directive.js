SampleDirective.$inject = ['SampleService'];
function SampleDirective(SampleService) {
    return {
        restrict: 'A',
        link(scope, element) {
            SampleService.log();
            element.prepend('<div>Sample Text</div>');
        }
    };
}

export default SampleDirective;
