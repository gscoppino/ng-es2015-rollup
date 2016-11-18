import angular from 'angular';

class Http {
    static get $inject() { return ['$q', '$http']; }
    constructor($q, $http) {
        Object.assign(this, { $q, $http });
        this.pendingRequests = {
            get: new Map(),
            put: new Map(),
            patch: new Map(),
            delete: new Map(),
        };
    }

    /*
     * $http.get, memoized to coalesce multiple closely timed requests
     * into one. Parameters and return values are identical.
     */
    get(...args) {
        let [url] = args;

        if (this.pendingRequests.get.has(url)) {
            return this.pendingRequests.get.get(url);
        }

        let promise = this.$http.get(...args)
            .finally(() => {
                this.pendingRequests.get.delete(url);
            });

        this.pendingRequests.get.set(url, promise);

        return promise;
    }

    /*
     * Stock $http.post. Parameters and return values are identical, except
     * in the case that an object with a id is passed as the payload, in which
     * case the function will return a promise rejection.
     */
    post(...args) {
        let [url, data] = args;
        if (data.id) {
            return this.$q.reject('Tried to POST an payload with an id!');
        }

        return this.$http.post(...args);
    }

    /*
     * $http.put, with enforced sequencing of requests, to prevent race conditions.
     * Parameters and return values are identical, except in the case that an
     * object without an id is passed as the payload, in which case the function
     * will return a promise rejection.
     */
    put(...args) {
        let [url, data] = args;
        if (!Number.isInteger(data.id)) {
            return this.$q.reject('Tried to PUT a payload without an integer id!');
        }

        if (this.pendingRequests.put.has(url)) {
            return this.pendingRequests.put.get(url)
                .then(() => {
                    return this.put(...args);
                });
        }

        let promise = this.$http.put(...args)
            .finally(() => {
                this.pendingRequests.put.delete(url);
            });

        this.pendingRequests.put.set(url, promise);

        return promise;
    }

    /*
     * $http.patch, with enforced sequencing of requests, to prevent race conditions.
     * Parameters and return values are identical, except in the case that an
     * object without an id is passed as the payload, in which case the function
     * will return a promise rejection.
     */
    patch(...args) {
        let [url, data] = args;
        if (!Number.isInteger(data.id)) {
            return this.$q.reject('Tried to PATCH a payload without an integer id!');
        }

        if (this.pendingRequests.patch.has(url)) {
            return this.pendingRequests.patch.get(url)
                .then(() => {
                    return this.patch(...args);
                });
        }

        let promise = this.$http.patch(...args)
            .finally(() => {
                this.pendingRequests.patch.delete(url);
            });

        this.pendingRequests.patch.set(url, promise);

        return promise;
    }

    /*
     * $http.delete, memoized to coalesce multiple closely timed requests
     * into one. Parameters and return values are identical.
     */
    delete(...args) {
        let [url] = args;

        if (this.pendingRequests.delete.has(url)) {
            return this.pendingRequests.delete.get(url);
        }

        let promise = this.$http.delete(...args)
            .finally(() => {
                this.pendingRequests.delete.delete(url);
            });

        this.pendingRequests.delete.set(url, promise);

        return promise;
    }
}

export { Http };
export default angular.module('app.services.Http', [])
    .service('Http', Http)
    .name;