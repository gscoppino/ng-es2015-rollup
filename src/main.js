/** @module main */
import './sw-init.js';
import './vendor.js';

import angular from 'angular';

import App from './app/app.js';

/** Bootstraps the Angular application. */
function bootstrap() {
    angular.bootstrap(document.documentElement, [App], { strictDi: true });
}

/**
 * Runs the application bootstrapper if the DOM is ready at time of execution,
 * or if not, schedules the bootstrap for whenever it is.
 */
function setupBootstrap() {
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
}

setupBootstrap();