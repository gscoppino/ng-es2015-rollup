import angular from 'angular';

class AppService {
    static $inject = ["$q"];

    constructor($q) {
        this._$q = $q;
    }

    resolveValue() {
        return this._$q.resolve(42);
    }
}

const app = angular
    .module('app', [])
        .service('AppService', AppService)
        .run(function () {
            console.log('Loaded!');
        });

export { AppService };
export default app;