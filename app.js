'use strict'

module.exports = async function (fastify, opts) {
  // connect db, etc
  fastify.register(require('./routes'))
}
