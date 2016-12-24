import angular from 'angular';

import { API_BASE } from 'app/core/api/api.module.js';

import { createMockApi } from './mock.module.js';

describe('createMockApi', () => {
    let httpBackendCallbackTest, httpBackendResponseSpy, mockHttpBackend, mockMockResourceFactory;

    beforeEach(() => {
        httpBackendCallbackTest = function (callback) {
            let response = callback();
            expect(response[0]).toBe(200);
            expect(response[1]).toEqual(jasmine.any(String));
        };

        httpBackendResponseSpy = jasmine.createSpy().and.callFake(httpBackendCallbackTest);

        mockHttpBackend = {
            whenRoute: jasmine.createSpy().and.returnValue({ respond: httpBackendResponseSpy })
        };

        mockMockResourceFactory = {
            create: jasmine.createSpy().and.callFake(angular.noop)
        };
    });

    it('should set up a mock api response to the root api endpoint.', () => {
        createMockApi(mockHttpBackend, mockMockResourceFactory);
        expect(mockHttpBackend.whenRoute).toHaveBeenCalledWith('GET', API_BASE);
        expect(httpBackendResponseSpy).toHaveBeenCalledWith(jasmine.any(Function));
    });
});