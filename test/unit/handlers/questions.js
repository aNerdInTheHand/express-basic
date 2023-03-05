const initQuestionsHandler = require('../../../src/handlers/questions')
const C = require('../../../src/constants')
const questions = [{
  question: 'What have I got in my pocket?',
  answer: 'c',
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
const { assert } = require('chai')

describe('handlers/questions', () => {
  const sandbox = sinon.createSandbox()

  const req = {}

  let consoleMock,
    errorSpy,
    logSpy,
    resMock,
    statusStub,
    sendSpy

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
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should log the call', () => {
    const questionsHandler = initQuestionsHandler({
      C,
      logger: consoleMock,
      questions
    })

    questionsHandler(req, resMock)

    assert(
      logSpy.calledOnceWith(`${C.routes.questions} route called`),
      'console.log not called as expected'
    )
  })

  it('should set the status code to 200', () => {
    const questionsHandler = initQuestionsHandler({
      C,
      logger: consoleMock,
      questions
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
      questions
    })

    questionsHandler(req, resMock)

    assert(
      sendSpy.calledOnceWith(questions),
      'res.send not called with questions'
    )
  })

  it('should throw an error', () => {
    statusStub.throws(Error('some error'))

    const questionsHandler = initQuestionsHandler({ C, logger: consoleMock, questions })

    assert.throws(
      () => questionsHandler(req, resMock),
      'some error'
    )
  })
})
