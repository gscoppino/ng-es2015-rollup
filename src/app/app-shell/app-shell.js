import angular from 'angular';
import AppShellTemplate from './app-shell.html';

class AppShellController {
    static get $inject() { return []; }
    static get bindings() {
        return {
            showDecorations: '<'
        };
    }
}

const AppShellInjectable = 'appShell',
    AppShellComponent = {
        template: AppShellTemplate,
        transclude: true,
        controller: AppShellController,
        bindings: AppShellController.bindings
    };

export { AppShellInjectable };
export default angular.module('app.components.app-shell', [])
    .component(AppShellInjectable, AppShellComponent)
    .name;
