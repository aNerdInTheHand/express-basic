module.exports = ({
  C,
  app,
  cors,
  corsOptions,
  expressJson,
  handlers,
  middleware
}) => {
  // handle POST requsts
  app.use(expressJson())

  app.use(cors(corsOptions))

  app.get(C.routes.healthcheck, handlers.healthcheck)

  app.get(C.routes.questions, handlers.questions)

  app.post(C.routes.submit, handlers.submit)

  app.use(middleware.errorHandler)
}
