import angular from 'angular';
import 'angular-mocks';

import { API_BASE } from 'app/config/api/api.module.js';
import { MOCK_USERS } from 'app/config/mock-api/fixtures/users.js';
import { MOCK_GROUPS } from 'app/config/mock-api/fixtures/groups.js';
import ApiMockBackendFactoryModule from 'app/services/mock-api/api-mock-backend-factory/api-mock-backend-factory.module.js';


createMockApi.$inject = ['$httpBackend', 'MockResourceFactory'];
/**
 * @memberof module:ApiMockBackendConfigModule
 * @description Creates some mock API endpoints for use by the application.
 */
function createMockApi($httpBackend, MockResourceFactory) {

    MockResourceFactory.create('users', {
        fixtureData: MOCK_USERS,
        logHTTPEvents: true
    });

    MockResourceFactory.create('groups', {
        fixtureData: MOCK_GROUPS,
        logHTTPEvents: true
    });

    $httpBackend.whenRoute('GET', API_BASE)
        .respond(() => [200, 'You have hit the mock api! If this is in error, remove any dependencies to mock.js in the app.']);
}

export { createMockApi };

/**
 * @module ApiMockBackendConfigModule
 * @requires ApiMockBackendFactoryModule
 * @description Configures and initializes the mock backend API.
 */
export default angular.module('app.config.mock-api', [
    'ngMockE2E',
    ApiMockBackendFactoryModule
])
    .run(createMockApi)
    .name;
