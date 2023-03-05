const initHealthcheck = require('../../../src/handlers/healthcheck')
const C = require('../../../src/constants')
const { assert } = require('chai')

describe('handlers/healthcheck', () => {
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
    const healthcheckHandler = initHealthcheck({
      C,
      logger: consoleMock
    })

    healthcheckHandler(req, resMock)

    assert(
      logSpy.calledOnceWith(`${C.routes.healthcheck} route called`),
      'console.log not called as expected'
    )
  })

  it('should set the status code to 200', () => {
    const healthcheckHandler = initHealthcheck({
      C,
      logger: consoleMock
    })

    healthcheckHandler(req, resMock)

    assert(
      statusStub.calledOnceWith(C.server.codes.success),
      'res.status not called with success code'
    )
  })

  it('should send the success response', () => {
    const healthcheckHandler = initHealthcheck({
      C,
      logger: consoleMock
    })

    healthcheckHandler(req, resMock)

    assert(
      sendSpy.calledOnceWith(C.messages.applicationHealthy),
      'res.send not called with application healthy message'
    )
  })

  it('should throw an error', () => {
    statusStub.throws(Error('some error'))

    const healthcheckHandler = initHealthcheck({ C, logger: consoleMock })

    assert.throws(
      () => healthcheckHandler(req, resMock),
      'some error'
    )
  })
})
