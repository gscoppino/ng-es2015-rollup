export default function GenericRESTCollectionMiddleware(resourceName, resourceStore) {

    var maxId = resourceStore
        .map((resource) => resource.id)
        .reduce((previous, current) => {
            if (current > previous) return current;
            else return previous;
        }, 0);

    return function (request, response) {

        // GET requests
        if (request.method === 'GET') {
            if (!request.params.id) {
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify(resourceStore));
                return;
            }

            let resource = resourceStore
                .find((resource) => resource.id === Number(request.params.id));

            if (resource) {
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify(resource));
            } else {
                response.statusCode = 404;
                response.end(`${resourceName} with id ${request.params.id} not found.`);
            }

            return;
        }

        // POST requests
        if (request.method === 'POST') {
            let requestBody = '';
            request.on('data', (chunk) => {
                requestBody += chunk.toString();
            });

            request.on('end', () => {
                let newResource = JSON.parse(requestBody);
                newResource.id = ++maxId;
                resourceStore.push(newResource);

                response.statusCode = 201;
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify(newResource));
            });
        }

        // PUT requests
        if (request.method === 'PUT') {
            if (!request.params.id) {
                response.statusCode = 404;
                response.end('no resource provided to update.');
                return;
            }

            let resource = resourceStore
                .find((resource) => resource.id === Number(request.params.id));

            if (!resource) {
                response.statusCode = 404;
                response.end(`${resourceName} with id ${request.params.id} not found.`);
                return;
            }

            let requestBody = '';
            request.on('data', (chunk) => {
                requestBody += chunk.toString();
            });

            request.on('end', () => {
                let rq = JSON.parse(requestBody);
                if (rq.id) {
                    delete rq.id;
                }

                Object.assign(resource, rq);

                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.end(JSON.stringify(resource));
            });
        }

        // DELETE requests
        if (request.method === 'DELETE') {
            if (!request.params.id) {
                response.statusCode = 404;
                response.end('no resource provided to delete');
                return;
            }

            let resourceIndex = resourceStore
                .findIndex((resource) => resource.id === Number(request.params.id));

            if (resourceIndex === -1) {
                response.statusCode = 200;
                response.statusMessage = 'resource was not existing';
                response.setHeader('Content-Type', 'application/json');
                response.end("{}");
                return;
            }

            let deletedResource = resourceStore.splice(resourceIndex, 1);
            response.statusCode = 200;
            response.statusMessage = 'resource deleted successfully';
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify(deletedResource));
        }
    }
}