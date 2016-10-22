import angular from 'angular';
import Store from '../store';
import UserService from 'app/core/api/services/users/users';


initStore.$inject = ['Store'];
function initStore(Store) {
    Store.state.users = [];
}

UserActions.$inject = ['Store', 'UserService'];
function UserActions(Store, UserService) {
    let addingUserMap = new Map();
    let editingUserMap = new Map();
    let removingUserMap = new Map();
    let syncingUsers = false;

    return {
        add(newUser={}) {
            if (newUser.id) {
                console.error('Tried to add a new user with an id!');
                return;
            }

            if (addingUserMap.has(newUser)) {
                return addingUserMap.get(newUser);
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
                    addingUserMap.delete(newUser);
                });

            addingUserMap.set(newUser, promise);
            return promise;
        },

        edit(editedUser={}) {
            if (!Number.isInteger(editedUser.id)) {
                console.error('Tried to edit a user without an id (or a malformed id)!');
                return;
            }

            if (editingUserMap.has(editedUser.id)) {
                return editingUserMap.get(editedUser.id)
                    .finally(() => {
                        return edit(editedUser);
                    });
            }

            let promise = Object.assign(UserService.one(editedUser.id), editedUser).put()
                .then((editedUser) => {
                    editedUser = editedUser.plain();

                    Store.update({
                        users: Store.state.users.map(user => {
                            return user.id !== editedUser.id ? user : Object.assign({}, user, editedUser)
                        })
                    });

                    return editedUser;
                })
                .finally(() => {
                    editingUserMap.delete(editedUser.id);
                });

            editingUserMap.set(editedUser.id, promise);
            return promise;
        },

        remove(id=null) {
            if (!Number.isInteger(id)) { return; }

            if (removingUserMap.has(id)) {
                return removingUserMap.get(id);
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
                    removingUserMap.delete(id);
                });

            removingUserMap.set(id, promise);
            return promise;
        },

        sync() {
            if (syncingUsers) {
                return syncingUsers;
            }

            syncingUsers = UserService.getList()
                .then((users) => {
                    users = users.plain();

                    Store.update({
                        users
                    });

                    return users;
                })
                .finally(() => {
                    syncingUsers = false;
                });

            return syncingUsers;
        }
    };
}

export default angular.module('app.store.users', [Store, UserService])
    .run(initStore)
    .service('UserActions', UserActions)
    .name;