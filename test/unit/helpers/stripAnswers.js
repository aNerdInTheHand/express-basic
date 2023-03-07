const stripAnswers = require('../../../src/helpers/stripAnswers')

describe('helpers/stripAnswers', () => {
  const options = [
    { id: 'a', text: 'Jeff' },
    { id: 'b', text: 'Bort' },
    { id: 'c', text: 'Jethetha' }
  ]

  const questions = [
    { id: 1, question: 'Who?', answer: 'a', options },
    { id: 2, question: 'What', answer: 'b', options },
    { id: 3, question: 'Where', answer: 'b', options },
    { id: 4, question: 'Why', answer: 'a', options },
    { id: 5, question: 'When', answer: 'c', options }
  ]

  it('should return the questions with no answers', () => {
    const expectedResult = [
      { id: 1, question: 'Who?', options },
      { id: 2, question: 'What', options },
      { id: 3, question: 'Where', options },
      { id: 4, question: 'Why', options },
      { id: 5, question: 'When', options }
    ]

    const result = stripAnswers({ questions })

    assert.deepEqual(
      expectedResult,
      result
    )
  })
})
