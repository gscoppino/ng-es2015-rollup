import angular from 'angular';
import AppComponent from './component';

const AppModule = angular
    .module('app', [])
        .component('main', AppComponent)
        .run(()=> {
            console.log('Loaded!');
        });

export default AppModule;