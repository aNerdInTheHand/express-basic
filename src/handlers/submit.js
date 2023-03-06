module.exports = ({
  C,
  calculateScore,
  logger,
  maxScore
}) => (req, res) => {
  logger.log(`${C.routes.submit} route called`)
  try {
    const score = calculateScore({
      answers: req.body.questions
    })
    res
      .status(C.server.codes.success)
      .send({ maxScore, score })
  } catch (error) {
    res
      .status(C.server.codes.internalError)
      .send('Womp womp')
  }
}
