import App from './app';

beforeEach(module(App));

it('should log to the console.', inject(($log) => {
    expect($log.log.logs.length).toEqual(1);
}));