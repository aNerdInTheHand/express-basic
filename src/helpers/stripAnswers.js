module.exports = ({
  questions
}) => questions
  .map(question => ({
    id: question.id,
    question: question.question,
    options: question.options
  }))
