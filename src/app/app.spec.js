import angular from 'angular';
import App from './app';

beforeEach(angular.mock.module(App));

it('should log to the console.', angular.mock.inject(($log) => {
    expect($log.log.logs.length).toEqual(1);
}));
