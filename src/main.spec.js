// Load angular and angular-mocks onto the global browser context.
import 'angular';
import 'angular-mocks';

// Import all spec files from the current directory and all subdirectories.
let testsContext = require.context('./app', true, /\.spec.js$/);
testsContext.keys().forEach((path) => {
    try { testsContext(path); }
    catch (err) {
        console.error('[ERROR] WITH SPEC FILE:', path);
        console.error(err);
    }
});
