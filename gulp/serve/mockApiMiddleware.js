import urlRouter from 'urlrouter';
import GenericRESTCollectionMiddleware from './utils/GenericRESTCollectionMiddleware';
import mockApiData from './mockApiData';

export default urlRouter((mockApi) => {

    mockApi.get('/', (request, response) => {
        response.end('Greetings from the mock api.');
    });

    mockApi.all('/users/:id?', GenericRESTCollectionMiddleware('users', mockApiData['users']));

});