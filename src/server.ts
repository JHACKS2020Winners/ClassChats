import Fastify from 'fastify';

// The server instance
const fastify = Fastify({ logger: true });

// Register routes
const routes = {
    api: {
        v1: require('./api/v1/api'),
    },
};

fastify.register(routes.api.v1, {
    prefix: '/api/v1',
});

// Redirect trailing slashes to non-trailing slashes
fastify.addHook('onRequest', async (request, reply) => {
    if (request.req.url!.match(/\/.*\/+$/)) {
        // Replace empty string with '/' to avoid issues with the root path
        const newUrl = request.req.url!.replace(/\/+$/, '') === '' ? '/' : '';
        reply.redirect(301, newUrl);
    }
});

// Start the server and export the promise
export = fastify
    .listen(3000, '0.0.0.0')
    .then((address) => {
        fastify.log.info(`Server listening at ${address}`);
        return address;
    })
    .catch((err) => {
        fastify.log.error(err);
        process.exit(1);
    });
