import angular from 'angular';
import Store from 'app/core/store/store';

const STORE_SLICE = (state) => state;

initStore.$inject = ['Store'];
function initStore(Store) {
    Store.update(STORE_SLICE, {
        api: {}
    });
}

export default angular.module('app.store.api', [Store])
    .run(initStore)
    .name;