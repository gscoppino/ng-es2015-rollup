import angular from 'angular';
import Api from './api/index.ts';
import Routes from './routes/index.ts';

Run.$inject = ['$log'];
function Run ($log) {
    const welcomeString: string = 'Loaded!';
    $log.log(welcomeString);
}

const AppModule = angular
    .module('app', [Api, Routes])
        .run(Run);

export default AppModule.name;
