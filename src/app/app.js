import angular from 'angular';
import Api from './api/api';
import Routes from './routes/routes';

Run.$inject = ['$log'];
function Run ($log) {
    $log.log('Loaded!');
}

export default angular.module('app', [Api, Routes])
    .run(Run)
    .name;
