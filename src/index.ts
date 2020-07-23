'use strict'

import debug from 'debug'
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import callbackAdapters from './callback-adapters'

const controller = callbackAdapters.fastify({ apiVersion: 'monolithic-f0.0.1' }).callback

const log = debug('fastify:index')

function myController (httpRequest) {
    log('myController:', httpRequest)
    return {
        statusCode: 200,
        body: {
            this: 'is a controller'
        }
    }
}

export default async function (fastify: FastifyInstance, opts: object | null) {
    // connect db, etc
    fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
        log('GET /', request.body)
        return reply.send({ ok: 1 })
    })

    fastify.get('/controller', controller(myController))
}
