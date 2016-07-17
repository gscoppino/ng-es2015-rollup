import angular from 'angular';

CompilerConfig.$inject = ['$compileProvider'];
function CompilerConfig($compileProvider) {
    /*
     * Disable debug mode if not running in a dev environment, for performance.
     * `location.hostname` is actually not a safe way to check where we are
     * running from, but it doesn't matter since this is just a performance
     * optimization.
     * Debug mode can be re-enabled in production environments by running
     * `angular.reloadWithDebugInfo()` from dev tools.
     */
    if (location.hostname !== 'localhost') {
        $compileProvider.debugInfoEnabled(false);
    }
}

export default angular.module('app.config', [])
    .config(CompilerConfig)
    .name;
