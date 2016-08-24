import angular from 'angular';
import Api from './api';

beforeEach(angular.mock.module(Api));
describe('Api Configuration', () => {
    it('should have the correct base URL.', angular.mock.inject((Restangular) => {
        expect(Restangular.configuration.baseUrl).toBe('/api');
    }));
});