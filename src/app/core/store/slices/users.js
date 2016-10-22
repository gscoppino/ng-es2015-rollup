import angular from 'angular';
import Store from '../store';
import UserService from 'app/core/api/services/users/users';


initStore.$inject = ['Store'];
function initStore(Store) {
    Store.state.users = [];
}

UserActions.$inject = ['Store', 'UserService'];
function UserActions(Store, UserService) {
    let pendingActions = {
        add: new Map(),
        edit: new Map(),
        remove: new Map(),
        sync : false
    };

    return {
        add(newUser={}) {
            if (newUser.id) {
                console.error('Tried to add a new user with an id!');
                return;
            }

            if (pendingActions.add.has(newUser)) {
                return pendingActions.add.get(newUser);
            }

            let promise = UserService.post(newUser)
                .then((newUser) => {
                    newUser = newUser.plain();

                    Store.update({
                        users: [
                            ...Store.state.users,
                            newUser
                        ]
                    });

                    return newUser;
                })
                .finally(() => {
                    pendingActions.add.delete(newUser);
                });

            pendingActions.add.set(newUser, promise);
            return promise;
        },

        edit(editedUser={}) {
            if (!Number.isInteger(editedUser.id)) {
                console.error('Tried to edit a user without an id (or a malformed id)!');
                return;
            }

            if (pendingActions.edit.has(editedUser.id)) {
                return pendingActions.edit.get(editedUser.id)
                    .finally(() => {
                        return this.edit(editedUser);
                    });
            }

            let promise = Object.assign(UserService.one(editedUser.id), editedUser).put()
                .then((editedUser) => {
                    editedUser = editedUser.plain();

                    Store.update({
                        users: Store.state.users.map(user => {
                            return user.id !== editedUser.id ? user : Object.assign({}, user, editedUser);
                        })
                    });

                    return editedUser;
                })
                .finally(() => {
                    pendingActions.edit.delete(editedUser.id);
                });

            pendingActions.edit.set(editedUser.id, promise);
            return promise;
        },

        remove(id=null) {
            if (!Number.isInteger(id)) { return; }

            if (pendingActions.remove.has(id)) {
                return pendingActions.remove.get(id);
            }

            let promise = UserService.one(id).remove()
                .then((removedUser) => {
                    removedUser = removedUser.plain();

                    Store.update({
                        users: Store.state.users.filter(user => user.id !== removedUser.id)
                    });

                    return removedUser;
                })
                .finally(() => {
                    pendingActions.remove.delete(id);
                });

            pendingActions.remove.set(id, promise);
            return promise;
        },

        sync() {
            if (pendingActions.sync) {
                return pendingActions.sync;
            }

            pendingActions.sync = UserService.getList()
                .then((users) => {
                    users = users.plain();

                    Store.update({
                        users
                    });

                    return users;
                })
                .finally(() => {
                    pendingActions.sync = false;
                });

            return pendingActions.sync;
        }
    };
}

export default angular.module('app.store.users', [Store, UserService])
    .run(initStore)
    .service('UserActions', UserActions)
    .name;