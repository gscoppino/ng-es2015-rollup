import angular from 'angular';
import Routes from './routes';

beforeEach(angular.mock.module(Routes));

describe('Routes Configuration', () => {
    it('should be in HTML5 mode.', angular.mock.inject(($location) => {
        try {
            // This function throws an exception if used as a setter, when not in HTML5 mode.
            // This is not the best way to do the test since it relies on knowledge of how this particular
            // function in the Angular API is written (the fact that it will throw an exception is not documented).
            $location.state({});
        } catch (exception) {
            fail();
        }
    }));
});