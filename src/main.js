import angular from 'angular';
import App from './app/app';

const AppInstance = Object.create(null);
document.addEventListener('DOMContentLoaded', () => {
    AppInstance.$injector = angular.bootstrap(document.documentElement, [App], { strictDi: true });
});

export default AppInstance;