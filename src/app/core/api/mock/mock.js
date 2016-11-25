import angular from 'angular';
import 'angular-mocks';
import { apiBase } from 'app/core/api/api.js';
import ApiMockBackendFactory from 'app/common/services/ApiMockBackendFactory/ApiMockBackendFactory.js';
import mockUsers from './fixtures/users.js';

createMockApi.$inject = ['$httpBackend', 'MockResourceFactory'];
function createMockApi($httpBackend, MockResourceFactory) {

    MockResourceFactory.create('users', mockUsers);

    $httpBackend.whenRoute('GET', apiBase)
        .respond(() => [200, 'You have hit the mock api! If this is in error, remove any dependencies to mock.js in the app.']);
}

export { createMockApi };

/**
 * @namespace app/api/mock
 * @desc Creates a fake implementation of the backend API.
 */
export default angular.module('app.api.mock', [
    'ngMockE2E',
    ApiMockBackendFactory
])
    .run(createMockApi)
    .name;