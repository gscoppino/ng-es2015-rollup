import angular from 'angular';
import AppComponent from './component';

const AppModule = angular
    .module('app', [])
        .component('main', AppComponent)
        .run(function () {
            console.log('Loaded!');
        });

export default AppModule;