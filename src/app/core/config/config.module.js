import angular from 'angular';
import AngularAriaModule from 'angular-aria';

RootscopeConfig.$inject = ['$rootScopeProvider'];
/**
 * @memberof module:ConfigModule
 * @description Keeps the limit on how many times a digest cycle can trigger
 * new model updates, as low as possible.
 */
function RootscopeConfig($rootScopeProvider) {
    // NOTE: Should avoid setting this above the AngularJS default (10 iterations).
    $rootScopeProvider.digestTtl(1);
}

CompilerConfig.$inject = ['$compileProvider'];
/**
 * @memberof module:ConfigModule
 * @description
 *   Disable AngularJS debug mode if not running in a dev environment.
 *   Enforce strict component bindings (non-optional bindings must always be provided to components).
 *   Keep the limit on how many times $onChanges can trigger new model updates,
 *     as low as possible.
 *   Disable use of class directives and comment directives.
 */
function CompilerConfig($compileProvider) {
    let hostname = (this || location).hostname;

    /*
     * Disabling debug mode provides a small performance boost.
     * `location.hostname` is actually not a safe way to check where we are
     * running from, but it doesn't matter since this is just a performance
     * optimization.
     * Debug mode can be re-enabled in production environments by running
     * `angular.reloadWithDebugInfo()` from dev tools.
     */
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
        $compileProvider.debugInfoEnabled(false);
    }


    // Reduces ambiguity by making contracts between application components clear.
    // In a binding is not marked optional, it is required.
    $compileProvider.strictComponentBindingsEnabled(true);

    // NOTE: Should avoid setting this above the AngularJS default (10 iterations).
    $compileProvider.onChangesTtl(0);

    // Disabling these directive types provides a small performance boost.
    $compileProvider.cssClassDirectivesEnabled(false);
    $compileProvider.commentDirectivesEnabled(false);
}

HttpConfig.$inject = ['$httpProvider'];
/**
 * @memberof module:ConfigModule
 * @description Allow coalescing of multiple HTTP responses into a single digest cycle.
 */
function HttpConfig($httpProvider) {
    // Provides a small performance boost by avoiding extra digest cycles.
    $httpProvider.useApplyAsync(true);
}

export { RootscopeConfig, CompilerConfig, HttpConfig };

/**
 * @module ConfigModule
 * @description Configures core AngularJS services.
 */
export default angular.module('app.config', [
    AngularAriaModule
])
    .config(RootscopeConfig)
    .config(CompilerConfig)
    .config(HttpConfig)
    .name;
