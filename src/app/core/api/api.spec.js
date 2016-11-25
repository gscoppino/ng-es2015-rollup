import angular from 'angular';
import Api, { apiBase } from './api.js';

beforeEach(angular.mock.module(Api));
describe('Api Configuration', () => {
    xit('should have the correct base URL.', angular.mock.inject((Restangular) => {
        expect(Restangular.configuration.baseUrl).toBe(apiBase);
    }));
});