import UserSelectors from 'app/core/store/users/selectors.js';

class UsersListController {

    static get $inject() { return ['$ngRedux', 'UserActions']; }
    constructor($ngRedux, UserActions) {
        Object.assign(this, { $ngRedux, UserActions });

        this._listeners = [];
        this.state = {
            usersList: []
        };
        this.actions = {
            users: this.UserActions
        };
    }

    $onInit() {
        // Ensure users store is initialized
        this.actions.users.sync();

        this._listeners.push(
            this.$ngRedux.subscribe(UserSelectors.list, (usersList) => {
                this.state.usersList = usersList;
            })
        );
    }

    $onChanges(changes) {}

    $doCheck() {}

    $onDestroy() {
        this._listeners.forEach((deregistrationFn) => deregistrationFn());
    }

    $postLink() {}

    submitNewUser(user=null) {
        this.actions.users.create(user);
    }

    editUser(user=null) {
        this.actions.users.update(user);
    }

    deleteUser(user=null) {
        this.actions.users.delete(user);
    }
}

export default {
    controller: UsersListController,
    bindings: {}
};
