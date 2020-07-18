import debug from 'debug'
const log = debug('app:user')

module.exports = {
  getRoot
}

async function getRoot (httpRequest) {
  log('httpRequest:', httpRequest)
  return {
    code: 200,
    body: {
      this: 'is root'
    }
  }
}
