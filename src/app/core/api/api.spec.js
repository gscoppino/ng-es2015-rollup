import angular from 'angular';

import { API_BASE, ApiConfig } from './api.module.js';

describe('Api Module', () => {
    let $providerInjector;

    beforeEach(angular.mock.module(($injector) => {
        $providerInjector = $injector;
    }));

    describe('Configuration', () => {
        beforeEach(angular.mock.inject(angular.noop));

        it('should configure the base URL for Api factory instances.', () => {
            let mockApiFactoryProvider = {
                setBaseUrl: jasmine.createSpy('ApiFactory.setBaseUrl')
                    .and.callFake(angular.noop)
            };

            $providerInjector.invoke(ApiConfig, null, {
                ApiFactoryProvider: mockApiFactoryProvider
            });

            expect(mockApiFactoryProvider.setBaseUrl)
                .toHaveBeenCalledWith(API_BASE);
        });
    });

});
