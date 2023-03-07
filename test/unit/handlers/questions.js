const initQuestionsHandler = require('../../../src/handlers/questions')
const C = require('../../../src/constants')
const questionsNoAnswers = [{
  id: 1,
  question: 'What have I got in my pocket?',
  options: [
    {
      id: 'a',
      text: 'fluff'
    },
    {
      id: 'b',
      text: 'yes'
    },
    {
      id: 'c',
      text: 'Jeff Goldblum'
    }
  ]
}]
const questions = questionsNoAnswers
  .map(question => Object.assign(
    {},
    { ...question },
    { answer: 'c' }
  ))

describe('handlers/questions', () => {
  const sandbox = sinon.createSandbox()

  const req = {}

  let consoleMock,
    errorSpy,
    logSpy,
    resMock,
    statusStub,
    sendSpy,
    stripAnswersStub

  beforeEach(() => {
    errorSpy = sinon.spy()
    logSpy = sinon.spy()

    consoleMock = {
      error: errorSpy,
      info: logSpy
    }

    sendSpy = sinon.spy()
    statusStub = sinon.stub()

    resMock = {
      send: sendSpy,
      status: statusStub
    }

    statusStub.returns(resMock)

    stripAnswersStub = sinon.stub()

    stripAnswersStub
      .withArgs({ questions })
      .returns(questionsNoAnswers)

    stripAnswersStub
      .returns('stripAnswersStub not calledWith questions')
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should log the call', () => {
    const questionsHandler = initQuestionsHandler({
      C,
      logger: consoleMock,
      questions,
      stripAnswers: stripAnswersStub
    })

    questionsHandler(req, resMock)

    assert(
      logSpy.calledOnceWith(`${C.routes.questions} route called`),
      'console.log not called as expected'
    )
  })

  it('should call stripAnswers with questions', () => {
    const questionsHandler = initQuestionsHandler({
      C,
      logger: consoleMock,
      questions,
      stripAnswers: stripAnswersStub
    })

    questionsHandler(req, resMock)

    assert(
      stripAnswersStub.calledOnceWith({ questions }),
      'stripAnswers not called as expected'
    )
  })

  it('should set the status code to 200', () => {
    const questionsHandler = initQuestionsHandler({
      C,
      logger: consoleMock,
      questions,
      stripAnswers: stripAnswersStub
    })

    questionsHandler(req, resMock)

    assert(
      statusStub.calledOnceWith(C.server.codes.success),
      'res.status not called with success code'
    )
  })

  it('should send the success response', () => {
    const questionsHandler = initQuestionsHandler({
      C,
      logger: consoleMock,
      questions,
      stripAnswers: stripAnswersStub
    })

    questionsHandler(req, resMock)

    assert(
      sendSpy.calledOnceWith(questionsNoAnswers),
      'res.send not called with questions without answers'
    )
  })

  it('should throw an error', () => {
    statusStub.throws(Error('some error'))

    const questionsHandler = initQuestionsHandler({
      C,
      logger: consoleMock,
      questions,
      stripAnswers: stripAnswersStub
    })

    assert.throws(
      () => questionsHandler(req, resMock),
      'some error'
    )
  })
})
