import App from './app';

beforeEach(module(App, ($provide) => {
    $provide.value('$log', { log: jasmine.createSpy() });
}));

it('should log to the console.', inject(($log) => {
    expect($log.log).toHaveBeenCalled();
}));