import angular from 'angular';
import ngResource from 'angular-resource';
import Api from 'app/api/api';

class Models {

    static $inject = ['$cacheFactory', '$resource', 'ApiUrl'];
    constructor($cacheFactory, $resource, ApiUrl) {
        Object.assign(this, { $cacheFactory, $resource, ApiUrl });
        this._cache = {};
    }

    create(name, options={}) {
        let cacheInitialized = {};

        const cache = this._cache[name] = this.$cacheFactory(name);
        const interceptor = {
            response: function (response) {
                console.log(response);
                if (!cacheInitialized[response.config.url] || (response.config.method === 'GET' && cache.get(response.config.url) !== undefined &&
                    response.headers().date !== cache.get(response.config.url)[2].date)) {

                    // The request must have been invoked by a method that bypasses the cache,
                    // or, this is the first hit to the server, so we need to update the cache now.

                    console.log('Updating cache');
                    if (Array.isArray(response.data)) {
                        response.data.forEach((dataItem)=> {
                            cache.put(`${response.config.url}/${dataItem.id}`, [response.status, JSON.stringify(dataItem), response.headers(), response.statusText]);
                        });
                    } else {
                        cache.put(response.config.url, [response.status, JSON.stringify(response.data), response.headers(), response.statusText]);
                    }

                    cacheInitialized[response.config.url] = true;
                } else if (response.config.method === 'POST') {
                    cache.put(`${response.config.url}/${response.data.id}`, [response.status, JSON.stringify(response.data), response.headers(), response.statusText]);
                } else if (response.config.method === 'PUT' || response.config.method === 'PATCH') {
                    cache.put(response.config.url, [response.status, JSON.stringify(response.data), response.headers(), response.statusText]);
                } else if (response.config.method === 'DELETE') {
                    cache.remove(response.config.url);
                }

                return response;
            }
        };

        const model = this.$resource(this.ApiUrl(name, ':id'), {}, {
            get: { method: 'GET', cache },
            getList: { method: 'GET', isArray: true, cache, interceptor },
            forceGet: { method: 'GET', interceptor },
            forceGetList: { method: 'GET', isArray: true, interceptor },
            post: { method: 'POST', interceptor },
            put: { method: 'PUT', interceptor },
            patch: { method: 'PATCH', interceptor },
            delete: { method: 'DELETE', interceptor }
        });

        return model;
    }

    reset() {
        Object.keys(this._cache)
            .forEach((cacheKey)=> this._cache[cacheKey].removeAll());
    }
}

export default angular.module('api.models', [ngResource, Api])
    .service('Models', Models)
    .name;
