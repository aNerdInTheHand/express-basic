const express = require('express')
const app = express()
const cors = require('cors')

const C = require('./constants')
const questions = require('./data/quiz.json')
const logger = console

const initHealthcheckHandler = require('./handlers/healthcheck')
const initQuestionsHandler = require('./handlers/questions')
const initSubmitHandler = require('./handlers/submit')
const initErrorHandler = require('./middleware/errorHandling')
const initCalculateScore = require('./helpers/calculateScore')

const answerIsCorrect = require('./helpers/answerIsCorrect')
const stripAnswers = require('./helpers/stripAnswers')
const calculateScore = initCalculateScore({
  C,
  answerIsCorrect,
  questions
})

const routing = require('./routing')

const corsOptions = {
  origin: C.server.allowedOrigins.local
}

const handlers = {
  healthcheck: initHealthcheckHandler({
    C,
    logger
  }),
  questions: initQuestionsHandler({
    C,
    logger,
    questions,
    stripAnswers
  }),
  submit: initSubmitHandler({
    C,
    calculateScore,
    logger,
    maxScore: questions.length
  })
}

const middleware = {
  errorHandler: initErrorHandler({ C, logger })
}

routing({
  C,
  app,
  cors,
  corsOptions,
  expressJson: express.json,
  handlers,
  middleware
})

app.listen(C.server.port, () => C.server.startMessage)
