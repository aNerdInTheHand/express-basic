module.exports = ({
  C,
  answerIsCorrect,
  questions
}) => ({
  answers
}) => answers
  .map(answer => {
    const correctAnswer = questions
      .find(question => question.id === answer.id)
      .answer
    return answerIsCorrect({
      correctAnswer,
      userAnswer: answer.answer
    })
      ? C.scoring.points.correctAnswer
      : C.scoring.points.incorrectAnswer
  })
  .reduce((total, current) => total + current)
