import angular from 'angular';
import template from './app.html';
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
export default angular.module('app', [Api, Routes])
    .component(AppComponentTag, AppComponent)
    .name;
