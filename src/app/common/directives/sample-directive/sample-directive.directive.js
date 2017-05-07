sampleDirective.$inject = ['SampleService'];
function sampleDirective(SampleService) {
    return {
        restrict: 'A',
        link(scope, element) {
            SampleService.log();
            element.prepend('<div>Sample Text</div>');
        }
    };
}

export default sampleDirective;
