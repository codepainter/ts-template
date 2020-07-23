import debug from 'debug'
import { FastifyRequest, FastifyReply } from 'fastify'

const log = debug('helper:fastify')

interface FastifyCallbackNamedParameters {
    apiVersion?: string
}

interface FastifyCustomResponse {
    lang?: string
    error?: object
    data?: object
    memoryUsage?: string | undefined
    elapsedTime?: string | undefined
}

export default function buildMakeFastifyCallback ({ heapdiff, getDurationInMilliseconds }) {
    return function makeFastifyCallback (opts: FastifyCallbackNamedParameters) {
        const { apiVersion = 'service-f0.0.0' } = opts
        log('apiVersion:', apiVersion)

        return Object.freeze({
            callback
        })

        function callback (controller) {
            return async function (request: FastifyRequest, reply: FastifyReply) {
                const response = makeResponse(reply)
                try {
                    const httpRequest = {
                        // user: request.user,
                        query: request.query,
                        body: request.body,
                        // files: request.files,
                        params: request.params,
                        headers: request.headers,
                        id: request.id,
                        log: request.log,
                        ip: request.ip,
                        ips: request.ips,
                        hostname: request.hostname
                    }
                    log('httpRequest:', httpRequest)

                    const hrstart = process.hrtime()
                    const memstart = process.memoryUsage().heapUsed
                    const httpResponse = await controller(httpRequest)
                    const memoryUsage = heapdiff(memstart)
                    const elapsedTime = getDurationInMilliseconds(hrstart)
                    log('httpResponse:', httpResponse)

                    if (httpResponse.statusCode !== 200) {
                        return response({ memoryUsage, elapsedTime, error: httpResponse })
                    }

                    response({ memoryUsage, elapsedTime, data: httpResponse.body })
                } catch (error) {
                    log('error:', error)
                    response({
                        memoryUsage: error.memoryUsage,
                        elapsedTime: error.elapsedTime,
                        error: {
                            code: error.httpResponse.statusCode,
                            message: error.httpResponse.body || error.body
                        }
                    })
                }
            }
        }

        function makeResponse (reply: FastifyReply) {
            return function response ({
                lang = 'en',
                error = {},
                data = {},
                memoryUsage = undefined,
                elapsedTime = undefined
            }: FastifyCustomResponse): void {
                reply
                    .code(200)
                    .header('Content-Type', 'application/json; charset=utf-8')
                    .send({ api_version: apiVersion, memory_usage: memoryUsage, elapse_time: elapsedTime, lang, error, data })
            }
        }
    }
}