'use strict'

const callback = require('./callback-adapter').fastify({
  apiVersion: 'goalsAndDrearms-v0.0.1'
}).callback
const { getRoot } = require('./dist/index')

module.exports = async function (fastify, opts) {
  fastify.get('/', callback(getRoot))
  // USER Routes
  // DREAMS Routes
  // etc
}
