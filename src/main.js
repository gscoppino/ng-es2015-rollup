import angular from 'angular';
import app from './app/app';

const $injector = angular
    .bootstrap(window.document, [app.name], { strictDi: true });

export default $injector;