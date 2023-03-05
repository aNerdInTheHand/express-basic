module.exports = ({
  C,
  app,
  expressJson,
  handlers,
  middleware
}) => {
  // handle POST requsts
  app.use(expressJson())

  app.get(C.routes.healthcheck, handlers.healthcheck)

  app.use(middleware.errorHandler)
}
