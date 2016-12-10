import angular from 'angular';
import 'angular-mocks';

import { API_BASE } from 'app/core/api/api.js';
import { MOCK_USERS } from 'app/core/api/mock/fixtures/users.js';
import ApiMockBackendFactory from 'app/common/services/ApiMockBackendFactory/ApiMockBackendFactory.js';


createMockApi.$inject = ['$httpBackend', 'MockResourceFactory'];
function createMockApi($httpBackend, MockResourceFactory) {

    MockResourceFactory.create('users', MOCK_USERS);

    $httpBackend.whenRoute('GET', API_BASE)
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