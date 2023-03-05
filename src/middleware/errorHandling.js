module.exports = ({
  C,
  logger
}) => (
  err,
  req,
  res,
  next
) => {
  logger.error(err)
  res.status(C.server.codes.internalError)
  res.send(C.messages.internalError)
}
