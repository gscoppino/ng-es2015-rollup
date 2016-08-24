import angular from 'angular';
import AppShellTemplate from './app-shell.html';

class AppShellController {
    static get $inject() { return []; }
}

const AppShellComponent = {
    template: AppShellTemplate,
    transclude: true,
    controller: AppShellController,
    bindings: {
        showDecorations: '<'
    }
};

export default angular.module('app.components.app-shell', [])
    .component('appShell', AppShellComponent)
    .name;
