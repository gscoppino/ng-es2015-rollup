class SampleService {
    static $inject = ['$log', '$q'];

    constructor($log, $q) {
        Object.assign(this, { $log: $log, $q: $q });
    }

    resolve() {
        return this.$q.resolve(42);
    }

    log() {
        this.$log.log('Sample Service: log message.');
    }
}

export default SampleService;
