'use strict'

import debug from 'debug'
const log = debug('fastify:')

import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify'

export default async function (fastify: FastifyInstance, opts) {
    // connect db, etc
    log('opts:', opts)
    fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
        log('GET /', request.body)
        return reply.send({ ok: 1 })
    })
}
