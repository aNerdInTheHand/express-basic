const port = 3000

module.exports = {
  allowedOrigins: {
    local: '*' // svelte application
  },
  codes: {
    internalError: 500,
    success: 200
  },
  port,
  startMessage: `Server running on port ${port}`
}
