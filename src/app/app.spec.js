import AppModule from './app';

beforeEach(module(AppModule.name));
describe('AppModule ->', ()=> {
    let $rootScope, $compile;
    
    beforeEach(inject(($injector) => {
        $rootScope = $injector.get('$rootScope');
        $compile = $injector.get('$compile');
    }));
    
    it('should be able to compile the "main" component.', function () {        
        let element = $compile(`<main></main>`)($rootScope.$new());
        $rootScope.$digest();
        
        expect(element.html()).toBeTruthy();
    });
});