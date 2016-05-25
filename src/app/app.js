import angular from 'angular';
import Api from './api/api';
import Routes from './routes/routes';

Run.$inject = ['$log'];
function Run ($log) {
    $log.log('Loaded!');
}

const AppModule = angular
    .module('app', [Api, Routes])
        .run(Run);

export default AppModule.name;
