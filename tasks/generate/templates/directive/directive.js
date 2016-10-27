import angular from 'angular';

<%= lowerCamelCaseName %>Directive.$inject = [];
function <%= lowerCamelCaseName %>() {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {}
    };
}

export default angular.module('app.directives.<%= name %>', [])
    .directive('<%= lowerCamelCaseName %>', <%= lowerCamelCaseName %>)
    .name;
