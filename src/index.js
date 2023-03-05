const express = require('express')
const app = express()

const C = require('./constants')
const logger = console

const initHealthcheckHandler = require('./handlers/healthcheck')
const initErrorHandler = require('./middleware/errorHandling')
const routing = require('./routing')

const handlers = {
  healthcheck: initHealthcheckHandler({ C, logger })
}

const middleware = {
  errorHandler: initErrorHandler({ C, logger })
}

routing({
  C,
  app,
  expressJson: express.json,
  handlers,
  middleware
})

app.listen(C.server.port, () => C.server.startMessage)
