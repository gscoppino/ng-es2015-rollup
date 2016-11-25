import angular from 'angular';
import { CompilerConfig } from './config.js';

describe('Compiler Configuration', () => {
    let mockLocationObj = {},
        mockCompileProvider = {};

    beforeEach(() => {
        mockCompileProvider.onChangesTtl = angular.noop;
        mockCompileProvider.debugInfoEnabled = jasmine.createSpy().and.callFake(angular.noop);
    });

    it('should disable debug mode if the current window location is not localhost.', () => {
        mockLocationObj.hostname = 'http://example.com';
        CompilerConfig.call(mockLocationObj, mockCompileProvider);
        expect(mockCompileProvider.debugInfoEnabled).toHaveBeenCalledWith(false);
    });

    it('should not disable debug mode if the current window location is localhost.', () => {
        mockLocationObj.hostname = 'localhost';
        CompilerConfig.call(mockLocationObj, mockCompileProvider);
        expect(mockCompileProvider.debugInfoEnabled).not.toHaveBeenCalled();

        mockLocationObj.hostname = '127.0.0.1';
        CompilerConfig.call(mockLocationObj, mockCompileProvider);
        expect(mockCompileProvider.debugInfoEnabled).not.toHaveBeenCalled();
    });
});