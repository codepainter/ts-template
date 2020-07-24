require('module-alias/register')

import debug from 'debug'
import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import callbackAdapters from '@utils/callback-adapters'

const controller = callbackAdapters.fastify({ apiVersion: 'monolithic-f0.0.1' }).callback

const log = debug('fastify:index')

interface IController {
    statusCode: number
    body: object | {}
}
function myController (httpRequest): IController {
    log('myController:', httpRequest)
    return {
        statusCode: 200,
        body: {
            this: 'is a controller'
        }
    }
}

export default async function (fastify: FastifyInstance, opts: object = {}) {
    // connect db, etc
    fastify.get('/', async function getRootHandler (request: FastifyRequest, reply: FastifyReply): Promise<any> {
        log('GET /')
        reply.send({ ok: 1 })
    })

    fastify.get('/controller', controller(myController))
}
