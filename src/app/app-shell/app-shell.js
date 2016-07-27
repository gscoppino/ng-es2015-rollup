import angular from 'angular';
import template from './app-shell.html';

class AppShellController {
    static get $inject() { return []; }
    static get bindings() {
        return {
            showDecorations: '<'
        };
    }
}

const AppShellComponentTag = 'appShell',
    AppShellComponent = {
        template,
        transclude: true,
        controller: AppShellController,
        bindings: AppShellController.bindings
    };

export { AppShellComponentTag };
export default angular.module('app.components.app-shell', [])
    .component(AppShellComponentTag, AppShellComponent)
    .name;
