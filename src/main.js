import angular from 'angular';
import AppModule from './app/app';

const $injector = angular
    .bootstrap(window.document, [AppModule.name], { strictDi: true });

export default $injector;