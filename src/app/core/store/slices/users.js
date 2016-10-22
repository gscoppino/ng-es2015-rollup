import angular from 'angular';
import Store from '../store';
import UserService from 'app/core/api/services/users/users';


initStore.$inject = ['Store'];
function initStore(Store) {
    Store.state.users = [];
}

class UserActions {
    static get $inject() { return ['Store', 'UserService']; }
    constructor(Store, UserService) {
        Object.assign(this, { Store, UserService });
        this._pendingActions = {
            add: new Map(),
            edit: new Map(),
            remove: new Map(),
            sync : false
        };
    }

    add(newUser={}) {
        if (newUser.id) {
            console.error('Tried to add a new user with an id!');
            return;
        }

        if (this._pendingActions.add.has(newUser)) {
            return this._pendingActions.add.get(newUser);
        }

        let promise = this.UserService.post(newUser)
            .then((newUser) => {
                newUser = newUser.plain();

                this.Store.update({
                    users: [
                        ...this.Store.state.users,
                        newUser
                    ]
                });

                return newUser;
            })
            .finally(() => {
                this._pendingActions.add.delete(newUser);
            });

        this._pendingActions.add.set(newUser, promise);
        return promise;
    }

    edit(editedUser={}) {
        if (!Number.isInteger(editedUser.id)) {
            console.error('Tried to edit a user without an id (or a malformed id)!');
            return;
        }

        if (this._pendingActions.edit.has(editedUser.id)) {
            return this._pendingActions.edit.get(editedUser.id)
                .finally(() => {
                    return this.edit(editedUser);
                });
        }

        let promise = Object.assign(this.UserService.one(editedUser.id), editedUser).put()
            .then((editedUser) => {
                editedUser = editedUser.plain();

                this.Store.update({
                    users: this.Store.state.users.map(user => {
                        return user.id !== editedUser.id ? user : Object.assign({}, user, editedUser);
                    })
                });

                return editedUser;
            })
            .finally(() => {
                this._pendingActions.edit.delete(editedUser.id);
            });

        this._pendingActions.edit.set(editedUser.id, promise);
        return promise;
    }

    remove(id=null) {
        if (!Number.isInteger(id)) { return; }

        if (this._pendingActions.remove.has(id)) {
            return this._pendingActions.remove.get(id);
        }

        let promise = this.UserService.one(id).remove()
            .then((removedUser) => {
                removedUser = removedUser.plain();

                this.Store.update({
                    users: this.Store.state.users.filter(user => user.id !== removedUser.id)
                });

                return removedUser;
            })
            .finally(() => {
                this._pendingActions.remove.delete(id);
            });

        this._pendingActions.remove.set(id, promise);
        return promise;
    }

    sync() {
        if (this._pendingActions.sync) {
            return this._pendingActions.sync;
        }

        this._pendingActions.sync = this.UserService.getList()
            .then((users) => {
                users = users.plain();

                this.Store.update({
                    users
                });

                return users;
            })
            .finally(() => {
                this._pendingActions.sync = false;
            });

        return this._pendingActions.sync;
    }
}

export default angular.module('app.store.users', [Store, UserService])
    .run(initStore)
    .service('UserActions', UserActions)
    .name;