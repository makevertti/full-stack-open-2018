const mongoose = require('mongoose')
const config = require('../utils/config')

const Blog = mongoose.model('Blog', {
  title: String,
  author: String,
  url: String,
  likes: Number
})

mongoose
.connect(config.mongoUrl)
.then( () => {
  console.log('Connected to database')
})
.catch( err => {
  console.log(err)
})

const closeDBConnection = () => {
  mongoose.connection.close()
}

const dropDB = () => {
  mongoose.connection.dropDatabase()
}

module.exports = {
  Blog,
  closeDBConnection,
  dropDB
}