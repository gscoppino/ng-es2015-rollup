import angular from 'angular';

import Api, { API_BASE } from './api.js';

beforeEach(angular.mock.module(Api));
describe('Api Configuration', () => {
    xit('should have the correct base URL.', angular.mock.inject((Restangular) => {
        expect(Restangular.configuration.baseUrl).toBe(API_BASE);
    }));
});