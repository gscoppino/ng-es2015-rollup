import angular from 'angular';
import App from './app/app';

document.addEventListener('DOMContentLoaded', () => {
    angular.bootstrap(document.documentElement, [App], { strictDi: true });
});
