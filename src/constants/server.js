const port = 3000

module.exports = {
  allowedOrigins: {
    local: 'http://localhost:5173' // svelte application
  },
  codes: {
    internalError: 500,
    success: 200
  },
  port,
  startMessage: `Server running on port ${port}`
}
