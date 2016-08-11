import angular from 'angular';

<%= lowerCamelCaseName %>Directive.$inject = [];
function <%= lowerCamelCaseName %>() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {}
    };
}
const { name: <%= UpperCamelCaseName %>DirectiveInjectable } = <%= lowerCamelCaseName %>;

export { <%= UpperCamelCaseName %>DirectiveInjectable };
export default angular.module('app.directives.<%= name %>', [])
    .directive(<%= UpperCamelCaseName %>DirectiveInjectable, <%= lowerCamelCaseName %>)
    .name;
