import app from './app'

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => {
  console.log(`WSV eCommerce start with port ${PORT}`)
})

process.on('SIGINT', () => {
  server.close(() => console.log(`Exit Express Server`))
})
