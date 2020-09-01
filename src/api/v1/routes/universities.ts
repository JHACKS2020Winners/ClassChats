import fastify = require('fastify');
import { FastifyInstance } from './types';

// All routes will be prefixed with `/universities` when registered by the main app
async function routes(fastify: FastifyInstance, options) {
    fastify.get('/v1/universities/:universityID', async (request, reply) => {
        const universities = await fastify.db.models.University.findAll();
        return universities;
    });

    fastify.put(
        '/v1/universities/',
        {
            schema: {
                body: {
                    name: 'string',
                    domain: 'string',
                },
            },
        },
        async (request, reply) => {
            const universities = await fastify.db.models.University.create({
                name: request.body.name,
                domain: request.body.domain,
            });
            return universities;
        },
    );

}

export = routes;