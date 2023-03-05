const express = require('express')
const app = express()

const C = require('./constants')
const questions = require('./data/quiz.json')
const logger = console

const initHealthcheckHandler = require('./handlers/healthcheck')
const initQuestionsHandler = require('./handlers/questions')
const initErrorHandler = require('./middleware/errorHandling')
const routing = require('./routing')

const handlers = {
  healthcheck: initHealthcheckHandler({ C, logger }),
  questions: initQuestionsHandler({ C, logger, questions })
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
