'use strict'

import debug from 'debug'
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'

const log = debug('fastify:index')

export default async function (fastify: FastifyInstance, opts: object | null) {
    // connect db, etc
    log('opts:', opts)
    fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
        log('GET /', request.body)
        return reply.send({ ok: 1 })
    })
}
