module.exports = ({
  C,
  logger
}) => (req, res) => {
  try {
    logger.info(`${C.routes.healthcheck} route called`)
    res
      .status(C.server.codes.success)
      .send(C.messages.applicationHealthy)
  } catch (error) {
    logger.error(C.messages.internalServerError)
    res
      .status(C.server.codes.internalError)
      .send(C.messages.internalServerError)
  }
}
