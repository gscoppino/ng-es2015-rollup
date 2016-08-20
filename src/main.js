import angular from 'angular';
import App from './app/app';

function bootstrap() {
    angular.bootstrap(document.documentElement, [App], { strictDi: true });
}

if (document.readyState === 'interactive' || document.readyState === 'complete') {
    // If the document readyState is "interactive", then the DOMContentLoaded event
    // has already been fired. If the readyState is "complete", then the readyState
    // has already transitioned from "interactive" at some point in the past.
    // Either way, we should perform the bootstrap.
    bootstrap();
} else {
    // Wait for the document to be ready before performing the bootstrap.
    document.addEventListener('DOMContentLoaded', bootstrap);
}