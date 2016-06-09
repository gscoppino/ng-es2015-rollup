import angular from 'angular';

class SampleService {
    static $inject = ['$log', '$q'];

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

const SampleServiceModule = angular.module('app.services.sample', [])
    .service('SampleService', SampleService);

export default SampleServiceModule.name;
