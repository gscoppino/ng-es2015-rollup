import angular from 'angular';
import 'angular-mocks';

import { API_BASE } from 'app/core/api/api.module.js';
import { MOCK_USERS } from 'app/core/api/mock/fixtures/users.js';
import { MOCK_GROUPS } from 'app/core/api/mock/fixtures/groups.js';
import ApiMockBackendFactoryModule from 'app/common/services/ApiMockBackendFactory/ApiMockBackendFactory.module.js';


createMockApi.$inject = ['$httpBackend', 'MockResourceFactory'];
function createMockApi($httpBackend, MockResourceFactory) {

    let usersResource = MockResourceFactory.create('users', {
        fixtureData: MOCK_USERS,
        logHTTPEvents: true
    });

    MockResourceFactory.create('groups', {
        fixtureData: MOCK_GROUPS,
        nestedResources: [usersResource],
        logHTTPEvents: true
    });

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
    ApiMockBackendFactoryModule
])
    .run(createMockApi)
    .name;
