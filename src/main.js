import angular from 'angular';
import App from './app/app';

if (document.readyState === 'interactive' || document.readyState === 'complete') {
    bootstrap();
} else {
    document.addEventListener('DOMContentLoaded', bootstrap);
}

function bootstrap() {
    angular.bootstrap(document.documentElement, [App], { strictDi: true });
}
