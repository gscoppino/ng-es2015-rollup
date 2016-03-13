import { AppController } from './component';

describe('AppComponent ->', ()=> {
    describe('AppController:', ()=> {
        let $log, controller;
        
        beforeEach(inject(($injector) => {
            $log = $injector.get('$log');
            controller = new AppController($log);
        }));
        
        describe('login', ()=> {
            it('should call $log with info.', function () {
                spyOn($log, 'info').and.callThrough();
                controller.login();
                expect($log.info).toHaveBeenCalled(); 
            });
        });
    });
});