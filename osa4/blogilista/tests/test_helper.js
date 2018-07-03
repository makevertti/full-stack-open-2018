const Blog = require('../models/blog')
const User = require('../models/user')

const formatBlog = (blog) => {
  return {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(formatBlog)
}

const getBlogIdByTitle = async (title) => {
  console.log(title)
  const blogs = await Blog.find({})
  return blogs.find(blog => blog.title === title)._id
}

const formatUser = (user) => {
  return {
    username: user.username,
    name: user.name,
    adult: user.adult
  }
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(formatUser)
}

module.exports = {
  formatBlog,
  blogsInDb,
  getBlogIdByTitle,
  usersInDb
}