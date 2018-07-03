const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async(request, response) => { 
  response.json(
    await Blog
      .find({}, {__v: 0})
      .populate('user', { _id: 1, username: 1, name: 1 }))
})

blogsRouter.post('/', async(request, response) => {
  try {
    const body = request.body
    if (body.title === undefined || body.url === undefined) return response.status(400).json({error: "title and url required"})
    if (body.likes === undefined) body.likes = 0

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(blog)
  } catch (err) {
    console.log(err)
    if (err.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: err.message })
    } else {
      response.status(500).json({error: 'something went wrong'})
    }
  }
})

blogsRouter.delete('/:id', async(request, response) => {
  if (request.params.id === undefined) return response.status(400).json({error: "id required"})
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    const user = await User.findById(decodedToken.id)

    console.log("=========")
    console.log("user:")
    console.log(user._id)
    console.log("blog.user:")
    console.log(blog.user._id)
    console.log("id !== blog.user._id?")
    console.log(user._id.toString() !== blog.user._id.toString())
    console.log("=========")

    if (user._id.toString() !== blog.user._id.toString()) {
      return response.status(401).json({ error: 'you can remove only blogs that you have created' })
    }

    await Blog.findByIdAndRemove(request.params.id)
    await response.status(204).end()
  } catch (err) {
    response.status(400).json({error: "failed to remove blog (invalid id)"})
  }
})

blogsRouter.put('/:id', async(request, response) => {
  if (request.params.id === undefined) return response.status(400).json({error: "id required"})
  try {
    const blog = {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes
    }

    await Blog.findByIdAndUpdate(request.params.id, blog)
    await response.status(200).end()
  } catch (err) {
    response.status(400).json({error: "failed to update blog (invalid id)"})
  }
})

module.exports = blogsRouter