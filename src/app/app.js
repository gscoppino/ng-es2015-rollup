import angular from 'angular';
import Api from './api/api';
import Routes from './routes/routes';

import Users from './api/models/users/users';

Run.$inject = ['$log', 'Users'];
function Run ($log, Users) {
    $log.log('Loaded!');
    Users.get({ id: 1 }).$promise.then(()=> {
        Users.get({ id: 1 });
    });
    Users.getList().$promise.then(()=> {
            Users.getList();
    });
    Users.getList({ search: 'Joe' });
    console.log(Users);
}

const AppModule = angular
    .module('app', [Api, Routes, Users])
        .run(Run);

export default AppModule.name;
