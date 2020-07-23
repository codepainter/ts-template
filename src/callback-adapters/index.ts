import buildMakeFastifyCallback from './fastify'
import bytes from 'bytes'

function heapdiff (byte: number): string {
    return bytes(Math.abs(process.memoryUsage().heapUsed - byte))
}

function getDurationInMilliseconds (start: [number, number]): string {
    const NS_PER_SEC = 1e9
    const NS_TO_MS = 1e6
    const diff = process.hrtime(start)

    return ((diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS).toPrecision(2).toString() + 'ms'
}

const fastify = buildMakeFastifyCallback({ heapdiff, getDurationInMilliseconds })

export default Object.freeze({
    fastify
})
