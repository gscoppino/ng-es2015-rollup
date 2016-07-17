import angular from 'angular';
import template from './app.html';
import Config from './config/config';
import Api from './api/api';
import Routes from './routes/routes';

class AppController {
    static $inject = ['$log'];
    static bindings = {};

    constructor($log) {
        $log.log('Loaded!');
    }
}

const AppComponentTag = 'app',
    AppComponent = {
        template,
        controller: AppController,
        bindings: AppController.bindings
    };

export { AppComponentTag };
export default angular.module('app', [Config, Api, Routes])
    .component(AppComponentTag, AppComponent)
    .name;
