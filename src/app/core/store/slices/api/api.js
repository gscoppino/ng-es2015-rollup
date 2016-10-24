import angular from 'angular';
import Store from 'app/core/store/store';

initStore.$inject = ['Store'];
function initStore(Store) {
    Store.update(state => state, {
        api: {}
    });
}

export default angular.module('app.store.api', [Store])
    .run(initStore)
    .name;