<%= UpperCamelCaseName %>Directive.$inject = [];
function <%= UpperCamelCaseName %>Directive() {
    return {
        restrict: 'A',
        link(scope, element, attrs) {}
    };
}

export default <%= UpperCamelCaseName %>Directive;
