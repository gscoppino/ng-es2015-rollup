import angular from 'angular';
import UIRouter from 'angular-ui-router';
import template from './app.html';
import Config from './config/config';
import Api from './api/api';
import Routes from './routes/routes';
import AppShell from './app-shell/app-shell';
import LoaderSpinner from './common/components/loader-spinner/loader-spinner';

class AppController {
    static $inject = ['$rootScope', '$log'];
    static bindings = {};

    constructor($rootScope, $log) {
        Object.assign(this, { $rootScope });
        this.showDecorations = null;
        this.listeners = [];

        $log.log('Loaded!');
    }

    _updateDecorationsState(event, {
        data: { showAppShellDecorations = true } = {}
    }) {
        this.showDecorations = showAppShellDecorations;
    }

    $onInit() {
        this.listeners.push(
            this.$rootScope.$on(
                '$stateChangeStart', this._updateDecorationsState.bind(this)
            )
        );
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
