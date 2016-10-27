import angular from 'angular';
import ngAria from 'angular-aria';

RootscopeConfig.$inject = ['$rootScopeProvider'];
function RootscopeConfig($rootScopeProvider) {
    /*
     * Keep the limit on how many times $digest can trigger new model updates,
     * as low as possible. Never go above the Angular default of 10 iterations.
     */
    $rootScopeProvider.digestTtl(1);
}

CompilerConfig.$inject = ['$compileProvider'];
function CompilerConfig($compileProvider) {
    let hostname = (this || location).hostname;

    /*
     * Disable debug mode if not running in a dev environment, for performance.
     * `location.hostname` is actually not a safe way to check where we are
     * running from, but it doesn't matter since this is just a performance
     * optimization.
     * Debug mode can be re-enabled in production environments by running
     * `angular.reloadWithDebugInfo()` from dev tools.
     */
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
        $compileProvider.debugInfoEnabled(false);
    }

    /*
     * Keep the limit on how many times $onChanges can trigger new model updates,
     * as low as possible. Never go above the Angular default of 10 iterations.
     */
    $compileProvider.onChangesTtl(0);
}

HttpConfig.$inject = ['$httpProvider'];
function HttpConfig($httpProvider) {
    /*
     * Allow coalescing multiple HTTP responses into a single digest cycle.
     * This is just a performance optimization.
     */
    $httpProvider.useApplyAsync(true);

    /*
     * Disable non-Promises/A+ handlers on promises returned by $http.
     * `success` and `error` should not be used, use `then` and `catch` instead.
     */
    $httpProvider.useLegacyPromiseExtensions = false;
}

export { RootscopeConfig, CompilerConfig, HttpConfig };

/**
 * @namespace app/config
 * @desc Configures core Angular services.
 */
export default angular.module('app.config', [ngAria])
    .config(RootscopeConfig)
    .config(CompilerConfig)
    .config(HttpConfig)
    .name;
