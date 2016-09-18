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
        this.isLoading = false;
        this.listeners = [];

        $log.log('Loaded!');
    }

    $onInit() {
        let update = this._update.bind(this);

        this.listeners.push(
            this.$rootScope.$on('$stateChangeStart', update),
            this.$rootScope.$on('$stateChangeSuccess', update),
            this.$rootScope.$on('$stateChangeError', update)
        );
    }

    _update(event, toState={}) {
        this.showDecorations = (toState.data && typeof toState.data.showAppShellDecorations === 'boolean') ? toState.data.showAppShellDecorations : true;
        this.isLoading = (event.name === '$stateChangeStart') ? true : false;
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
