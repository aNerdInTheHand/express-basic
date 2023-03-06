const initCalculateScore = require('../../../src/helpers/calculateScore')
const C = require('../../../src/constants')
const { assert } = require('chai')

describe('helpers/calculateScore', () => {
  const sandbox = sinon.createSandbox()

  const questions = [
    { id: 1, answer: 'a' },
    { id: 2, answer: 'b' },
    { id: 3, answer: 'c' }
  ]

  let answerIsCorrectStub

  beforeEach(() => {
    answerIsCorrectStub = sinon.stub()

    answerIsCorrectStub
      .withArgs({ correctAnswer: 'a', userAnswer: 'a' })
      .returns(true)

    answerIsCorrectStub
      .withArgs({ correctAnswer: 'b', userAnswer: 'b' })
      .returns(true)

    answerIsCorrectStub
      .withArgs({ correctAnswer: 'c', userAnswer: 'c' })
      .returns(true)

    answerIsCorrectStub
      .returns(false)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should return 3 for 3 correct answers and no incorrect answers', () => {
    const calculateScore = initCalculateScore({
      C,
      answerIsCorrect: answerIsCorrectStub,
      questions
    })

    const answers = [
      { id: 1, answer: 'a' },
      { id: 2, answer: 'b' },
      { id: 3, answer: 'c' }
    ]

    const score = calculateScore({
      answers
    })

    assert.equal(
      score,
      3
    )
  })

  it('should return 2 for 2 correct answers and 1 incorrect answer', () => {
    const calculateScore = initCalculateScore({
      C,
      answerIsCorrect: answerIsCorrectStub,
      questions
    })

    const answers = [
      { id: 1, answer: 'c' },
      { id: 2, answer: 'b' },
      { id: 3, answer: 'c' }
    ]

    const score = calculateScore({
      answers
    })

    assert.equal(
      score,
      2
    )
  })

  it('should return 0 for 0 correct answers and 3 incorrect answer', () => {
    const calculateScore = initCalculateScore({
      C,
      answerIsCorrect: answerIsCorrectStub,
      questions
    })

    const answers = [
      { id: 1, answer: 'c' },
      { id: 2, answer: 'a' },
      { id: 3, answer: 'b' }
    ]

    const score = calculateScore({
      answers
    })

    assert.equal(
      score,
      0
    )
  })
})
