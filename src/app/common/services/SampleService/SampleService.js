import angular from 'angular';

class SampleService {
    constructor($log, $q) {
        'ngInject';

        Object.assign(this, { $log, $q });
    }

    resolve() {
        return this.$q.resolve(42);
    }

    log() {
        this.$log.log('Sample Service: log message.');
    }
}

const SampleServiceName = SampleService.name;

export { SampleServiceName as SampleServiceInjectable };
export default angular.module('app.services.sample', [])
    .service(SampleServiceName, SampleService)
    .name;
