'use strict'

import debug from 'debug'
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import callbackAdapters from './callback-adapters/index'
const controller = callbackAdapters.fastify({ apiVersion: 'service-f0.0.1' })

const log = debug('fastify:index')

export default async function (fastify: FastifyInstance, opts: object | null) {
    // connect db, etc
    log('opts:', opts)
    fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
        log('GET /', request.body)
        return reply.send({ ok: 1 })
    })
}
