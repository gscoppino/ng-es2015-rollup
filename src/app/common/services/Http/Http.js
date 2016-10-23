import angular from 'angular';

class Http {
    static get $inject() { return ['$http']; }
    constructor($http) {
        Object.assign(this, { $http });
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
     * Stock $http.post. Parameters and return values are identical.
     */
    post(...args) {
        return this.$http.post(...args);
    }

    /*
     * $http.put, with enforced sequencing of requests, to prevent race conditions.
     * Parameters and return values are identical.
     */
    put(...args) {
        let [url] = args;

        if (this.pendingRequests.put.has(url)) {
            return this.pendingRequests.put.get(url)
                .finally(() => {
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
     * Parameters and return values are identical.
     */
    patch(...args) {
        let [url] = args;

        if (this.pendingRequests.patch.has(url)) {
            return this.pendingRequests.patch.get(url)
                .finally(() => {
                    return this._basePatch(...args);
                });
        }

        let promise = this.$http.put(...args)
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