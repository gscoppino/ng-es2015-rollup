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

export { SampleService };