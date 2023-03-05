module.exports = ({
  C,
  logger,
  questions
}) => (req, res) => {
  try {
    logger.info(`${C.routes.questions} route called`)
    res
      .status(C.server.codes.success)
      .send(questions)
  } catch (error) {
    logger.error(C.messages.internalServerError)
    res
      .status(C.server.codes.internalError)
      .send(C.messages.internalServerError)
  }
}
