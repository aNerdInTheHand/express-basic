module.exports = ({
  C,
  logger,
  questions,
  stripAnswers
}) => (req, res) => {
  try {
    logger.info(`${C.routes.questions} route called`)
    const questionsWithoutAnswers = stripAnswers({ questions })
    const questionsToServe = req.query && req.query.id
      ? questionsWithoutAnswers.filter(question => question.id === Number(req.query.id))
      : questionsWithoutAnswers
    res
      .status(C.server.codes.success)
      .send(questionsToServe)
  } catch (error) {
    logger.error(C.messages.internalServerError)
    res
      .status(C.server.codes.internalError)
      .send(C.messages.internalServerError)
  }
}
