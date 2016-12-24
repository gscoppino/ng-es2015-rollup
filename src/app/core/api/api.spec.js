import angular from 'angular';

import ApiModule, { API_BASE } from './api.module.js';

beforeEach(angular.mock.module(ApiModule));
describe('Api Configuration', () => {
    xit('should have the correct base URL.', angular.mock.inject((Restangular) => {
        expect(Restangular.configuration.baseUrl).toBe(API_BASE);
    }));
});