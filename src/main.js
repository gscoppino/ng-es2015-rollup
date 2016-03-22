import angular from 'angular';
import App from './app/app';

const $injector = angular
    .bootstrap(window.document, [App], { strictDi: true });

export default $injector;