import angular from 'angular';
import Routes from './routes/routes';

const AppModule = angular
    .module('app', [Routes])
        .run(($log)=> {
            $log.log('Loaded!');
        });

export default AppModule.name;