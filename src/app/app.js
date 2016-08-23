import angular from 'angular';
import UIRouter from 'angular-ui-router';
import Config from './common/config/config';
import Api from './api/api';
import Routes from './routes/routes';
import AppShell from './app-shell/app-shell';
import LoaderSpinner from './common/components/loader-spinner/loader-spinner';
import template from './app.html';

class AppController {
    static get $inject() { return ['$rootScope', '$log']; }
    constructor($rootScope, $log) {
        Object.assign(this, { $rootScope });
        this.showDecorations = null;
        this.listeners = [];

        $log.log('Loaded!');
    }

    static get bindings() {
        return {};
    }
    $onInit() {
        this.listeners.push(
            this.$rootScope.$on(
                '$stateChangeStart', this._updateDecorationsState.bind(this)
            )
        );
    }

    _updateDecorationsState(event, {
        data: { showAppShellDecorations = true } = {}
    }) {
        this.showDecorations = showAppShellDecorations;
    }

    $onDestroy() {
        this.listeners.forEach(deregister => deregister());
    }
}

const AppComponentTag = 'app',
    AppComponent = {
        template,
        controller: AppController,
        bindings: AppController.bindings
    };

export { AppComponentTag };
export default angular.module('app', [Config, Api, UIRouter, Routes, AppShell, LoaderSpinner])
    .component(AppComponentTag, AppComponent)
    .name;
