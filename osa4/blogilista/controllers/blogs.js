const blogsRouter = require('express').Router()
const Blog = require('../models/blog').Blog

blogsRouter.get('/', async(request, response) => { 
  response.json(await Blog.find({}))
})

blogsRouter.post('/', async(request, response) => {
  if (request.body.likes === undefined) request.body.likes = 0
  if (request.body.title === undefined || request.body.url === undefined) {
    response.status(400).json({error: "title and url required"})
  } else {
    response.status(201).json(await new Blog(request.body).save())
  }
})

module.exports = blogsRouter