/** @module app/app-shell/app-shell */
import angular from 'angular';
import AppShellTemplate from './app-shell.html';

/**
 * @class
 * @classdesc Component Class for the application shell.
 */
class AppShellController {
    static get $inject() { return []; }
}

/**
 * @memberof module:app/app-shell/app-shell#
 * @desc The component responsible for rendering the application shell, as well as the application itself.
 * @property controller {function} - [AppShellController]{@link module:app/app-shell/app-shell~AppShellController}
 * @property bindings.showDecorations {boolean} - Controls whether the application shell is rendered.
 */
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
