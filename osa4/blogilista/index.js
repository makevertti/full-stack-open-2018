const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')
const dbModel = require('./models/blog')

app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  dbModel.closeDBConnection()
})

module.exports = {
  app,
  server
}