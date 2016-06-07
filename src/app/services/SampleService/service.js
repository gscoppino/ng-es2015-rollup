/** @module SampleService */

/** Class to demonstrate general structure of a service. **/
class SampleService {
    static $inject = ['$log', '$q'];

    /**
     * Assigns dependencies onto the component context.
     */
    constructor($log, $q) {
        Object.assign(this, { $log, $q });
    }

    /**
     * Provide a value asynchronously.
     * @return {Promise<number>} the resolved value.
     */
    resolve() {
        return this.$q.resolve(42);
    }

    /**
     * Log a message to the logger.
     */
    log() {
        this.$log.log('Sample Service: log message.');
    }
}

export default SampleService;
