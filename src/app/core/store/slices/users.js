import angular from 'angular';
import Store from 'app/core/store/store';
import UserService from 'app/core/api/services/users/users';


initStore.$inject = ['Store'];
function initStore(Store) {
    Store.update({
        users: []
    });
}

class UserActions {
    static get $inject() { return ['Store', 'UserService']; }
    constructor(Store, UserService) {
        Object.assign(this, { Store, UserService });
    }

    add(newUser={}) {
        return this.UserService.post(newUser)
            .then((newUser) => {
                this.Store.update({
                    users: [
                        ...this.Store.get(state => state.users),
                        newUser
                    ]
                });

                return newUser;
            });
    }

    edit(editedUser={}) {
        return this.UserService.put(editedUser)
            .then((editedUser) => {
                this.Store.update({
                    users: this.Store
                        .get(state => state.users)
                        .map(user => {
                            return user.id !== editedUser.id ? user : Object.assign({}, user, editedUser);
                        })
                });

                return editedUser;
            });
    }

    remove(id=null) {
        return this.UserService.delete(id)
            .then((removedUser) => {
                this.Store.update({
                    users: this.Store
                        .get(state => state.users)
                        .filter(user => user.id !== removedUser.id)
                });

                return removedUser;
            });
    }

    sync() {
        return this.UserService.getList()
            .then((users) => {
                this.Store.update({
                    users
                });

                return users;
            });
    }

    syncOne(id=null) {
        return this.UserService.get(id)
            .then((syncedUser) => {
                this.Store.update({
                    users: this.Store
                        .get(state => state.users)
                        .map((user) => {
                            return user.id !== syncedUser.id ? user : Object.assign({}, user, syncedUser);
                        })
                });

                return syncedUser;
            });
    }
}

export default angular.module('app.store.users', [Store, UserService])
    .run(initStore)
    .service('UserActions', UserActions)
    .name;