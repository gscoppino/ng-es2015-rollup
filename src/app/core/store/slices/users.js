import angular from 'angular';
import Store from '../store';
import UserService from 'app/core/api/services/users/users';


initStore.$inject = ['Store'];
function initStore(Store) {
    Store.state.users = [];
}

UserActions.$inject = ['Store', 'UserService'];
function UserActions(Store, UserService) {
    return {
        add(newUser={}) {
            if (newUser.id) {
                console.error('Tried to add a new user with an id!');
                return;
            }

            return UserService.post(newUser)
                .then((newUser) => {
                    newUser = newUser.plain();

                    Store.update({
                        users: [
                            ...Store.state.users,
                            newUser
                        ]
                    });

                    return newUser;
                });
        },

        edit(editedUser={}) {
            if (!Number.isInteger(editedUser.id)) {
                console.error('Tried to edit a user without an id (or a malformed id)!');
                return;
            }

            return Object.assign(UserService.one(editedUser.id), editedUser).put()
                .then((editedUser) => {
                    editedUser = editedUser.plain();

                    Store.update({
                        users: Store.state.users.map(user => {
                            return user.id !== editedUser.id ? user : Object.assign({}, user, editedUser)
                        })
                    });

                    return editedUser;
                });
        },

        remove(id=null) {
            if (!Number.isInteger(id)) { return; }

            return UserService.one(id).remove()
                .then((removedUser) => {
                    removedUser = removedUser.plain();

                    Store.update({
                        users: Store.state.users.filter(user => user.id !== removedUser.id)
                    });

                    return removedUser;
                });
        },

        sync() {
            return UserService.getList()
                .then((users) => {
                    users = users.plain();

                    Store.update({
                        users
                    });

                    return users;
                });
        }
    };
}

export default angular.module('app.store.users', [Store, UserService])
    .run(initStore)
    .service('UserActions', UserActions)
    .name;