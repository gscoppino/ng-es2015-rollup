import angular from 'angular';

<%= UpperCamelCaseName %>DirectiveFactory.$inject = [];
function <%= UpperCamelCaseName %>DirectiveFactory() {
    return {
        restrict: 'A',
        link(scope, element, attrs) {}
    };
}

export default angular.module('app.directives.<%= name %>', [])
    .directive('<%= lowerCamelCaseName %>', <%= UpperCamelCaseName %>DirectiveFactory)
    .name;
