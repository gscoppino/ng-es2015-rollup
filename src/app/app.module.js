import angular from 'angular';

import UIRouterModule from '@uirouter/angularjs';
import { ConfigModule } from 'app/config/config.module.js';
import { AppRouterModule } from 'app/routes/app/app.module.js';
import { LoaderSpinnerModule } from 'app/components/loader-spinner/loader-spinner.module.js';

import { AppComponent } from './app.component.js';

/**
 * @type {angular.Module}
 * @desc Provides the root component of the application and
 *   initializes all other needed modules for the application.
 */
export const AppModule = angular
    .module('app', [
        UIRouterModule,
        ConfigModule,
        AppRouterModule,
        LoaderSpinnerModule
    ])
    .component('app', AppComponent)
    .name;
