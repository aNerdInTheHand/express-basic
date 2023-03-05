module.exports = ({
  C,
  logger
}) => (req, res) => {
  logger.log(`${C.routes.submit} route called`)
  try {
    logger.info(req.body)
    res
      .status(C.server.codes.success)
      .send({ text: 'Results submitted. You suck.' })
  } catch (error) {
    res
      .status(C.server.codes.internallError)
      .send('Womp womp')
  }
}