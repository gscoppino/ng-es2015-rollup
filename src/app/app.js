import angular from 'angular';
import Routes from './routes/routes';

Run.$inject = ['$log'];
function Run ($log) {
    $log.log('Loaded!');
}

const AppModule = angular
    .module('app', [Routes])
        .run(Run);

export default AppModule.name;