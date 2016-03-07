import 'angular';
import 'angular-mocks';
import app, { AppService } from './app';

beforeEach(module(app.name));
describe('app ->', function () {
    describe('AppService:', function () {
        it('method should resolve something.', inject(function ($injector) {
            let $rootScope = $injector.get('$rootScope');
            let $q = $injector.get('$q');

            let service = new AppService($q);

            service.resolveValue()
                .then(function (value) {
                    expect(value).toEqual(42);
                });

            $rootScope.$digest();
        }));
    });
});