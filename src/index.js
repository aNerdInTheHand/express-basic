const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')

const C = require('./constants')
const questions = require('./data/quiz.json')
const logger = console

const initHealthcheckHandler = require('./handlers/healthcheck')
const initQuestionsHandler = require('./handlers/questions')
const initSubmitHandler = require('./handlers/submit')
const initErrorHandler = require('./middleware/errorHandling')
const routing = require('./routing')

const corsOptions = {
  origin: C.server.allowedOrigins.local
}

const handlers = {
  healthcheck: initHealthcheckHandler({ C, logger }),
  questions: initQuestionsHandler({ C, logger, questions }),
  submit: initSubmitHandler({ C, logger })
}

const middleware = {
  errorHandler: initErrorHandler({ C, logger })
}

routing({
  C,
  app,
  cors,
  bodyParser,
  handlers,
  middleware
})

app.listen(C.server.port, () => C.server.startMessage)
