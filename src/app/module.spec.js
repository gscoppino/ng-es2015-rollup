import AppModule from './module';

beforeEach(module(AppModule.name));
describe('AppModule ->', function () {
    it('should be able to compile the "main" component.', inject(($injector) => {
        let $rootScope = $injector.get('$rootScope');
        let $compile = $injector.get('$compile');
        
        let element = $compile(`<main></main>`)($rootScope.$new());
        $rootScope.$digest();
        
        expect(element.html()).toBeTruthy();
    }));
});