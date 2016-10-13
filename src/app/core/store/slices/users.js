import angular from 'angular';
import Store from '../store';


initStore.$inject = ['Store'];
function initStore(Store) {
    Store.state.users = [];
}

UserActions.$inject = ['Store'];
function UserActions(Store) {
    return {
        add(name="") {
            if (!name.length) { return; }

            Store.update({
                users: [
                    ...Store.state.users,
                    { name }
                ]
            });
        },

        remove(name="") {
            if (!name.length) { return; }

            Store.update({
                users: Store.state.users
                    .filter(user => user.name !== name)
            });
        }
    };
}

export default angular.module('app.store.users', [Store])
    .run(initStore)
    .service('UserActions', UserActions)
    .name;