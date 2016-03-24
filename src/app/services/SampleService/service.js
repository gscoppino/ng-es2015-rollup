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

const SampleServiceModule = angular
    .module('SampleServiceModule', [])
        .service('SampleService', SampleService);

export default SampleServiceModule.name;