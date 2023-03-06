const { assert } = require('chai')
const answerIsCorrect = require('../../../src/helpers/answerIsCorrect')

describe('helpers/answerIsCorrect', () => {
  const correctAnswer = 'c'

  it('should return true when answers match', () => {
    const result = answerIsCorrect({
      correctAnswer,
      userAnswer: 'c'
    })
    assert.isTrue(result)
  })

  it('should return false when the answers do not match', () => {
    const result = answerIsCorrect({
      correctAnswer,
      userAnswer: 3
    })
    assert.isFalse(result)
  })

  it('should return false when no answer is provided', () => {
    const result = answerIsCorrect({
      correctAnswer
    })
    assert.isFalse(result)
  })
})
