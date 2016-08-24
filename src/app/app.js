import angular from 'angular';
import UIRouter from 'angular-ui-router';
import Config from './common/config/config';
import Api from './api/api';
import Routes from './routes/routes';
import AppShell from './app-shell/app-shell';
import LoaderSpinner from './common/components/loader-spinner/loader-spinner';
import AppTemplate from './app.html';

class AppController {

    static get $inject() { return ['$rootScope', '$log']; }
    constructor($rootScope, $log) {
        Object.assign(this, { $rootScope });

        this.showDecorations = null;
        this.listeners = [];

        $log.log('Loaded!');
    }

    $onInit() {
        let listener =  this.$rootScope
            .$on('$stateChangeStart', this._updateDecorationsState.bind(this));

        this.listeners.push(listener);
    }

    _updateDecorationsState(event, toState={}) {
        this.showDecorations = (toState.data && typeof toState.data.showAppShellDecorations === 'boolean') ? toState.data.showAppShellDecorations : true;
    }

    $onDestroy() {
        this.listeners.forEach(deregister => deregister());
    }
}

const AppComponent = {
    template: AppTemplate,
    controller: AppController,
    bindings: {}
};

export default angular.module('app', [
    Config,
    Api,
    UIRouter,
    Routes,
    AppShell,
    LoaderSpinner
])
    .component('app', AppComponent)
    .name;
