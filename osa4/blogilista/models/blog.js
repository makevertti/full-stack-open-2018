const mongoose = require('mongoose')

const Blog = mongoose.model('Blog', {
  title: String,
  author: String,
  url: String,
  likes: Number
})

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const mongoUrl = process.env.MONGODB_URL
mongoose.connect(mongoUrl)

module.exports = Blog