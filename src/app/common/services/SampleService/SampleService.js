import angular from 'angular';

class SampleService {

    static get $inject() { return ['$log', '$q']; }
    constructor($log, $q) {
        Object.assign(this, { $log, $q });
    }

    resolve() {
        return this.$q.resolve(42);
    }

    log() {
        this.$log.log('Sample Service: log message.');
    }
}

export default angular.module('app.services.SampleService', [])
    .service('SampleService', SampleService)
    .name;
