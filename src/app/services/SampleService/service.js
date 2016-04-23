import angular from 'angular';

class SampleService {
    static $inject = ['$log', '$q'];

    constructor($log, $q) {
        angular.extend(this, { $log, $q });
    }

    resolve() {
        return this.$q.resolve(42);
    }

    log() {
        this.$log.log('Sample Service: log message.');
    }
}

export default SampleService;