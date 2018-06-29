const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const db = require('../models/blog')

beforeAll(async () => {
  await db.dropDB()

  const newBlog1 = {
    title: 'defaultBlog1',
    author: 'testBlogger',
    url: 'http://127.0.0.1/',
    likes: 1
  }
  const newBlog2 = {
    title: 'defaultBlog2',
    author: 'testBlogger',
    url: 'http://127.0.0.1/',
    likes: 2
  }

  await api
    .post('/api/blogs')
    .send(newBlog1)

  await api
    .post('/api/blogs')
    .send(newBlog2)
})

describe('get blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('correct number of blogs is returned', async () => {
    const response = await api
      .get('/api/blogs')
    expect(response.body.length).toBe(2)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api
      .get('/api/blogs')
    const blog = response.body.find(r => r.title === 'defaultBlog1')
    expect(blog.title).toBe('defaultBlog1')
    expect(blog.author).toBe('testBlogger')
    expect(blog.url).toBe('http://127.0.0.1/')
    expect(blog.likes).toBe(1)
  })
})

describe('add blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'testAdd',
      author: 'testBlogger',
      url: 'http://127.0.0.1/',
      likes: 12
    }
    
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('content-Type', /application\/json/)
    const response = await api
      .get('/api/blogs')
      
    const blog = response.body.find(r => r.title === 'testAdd')
    expect(blog.title).toBe('testAdd')
    expect(blog.author).toBe('testBlogger')
    expect(blog.url).toBe('http://127.0.0.1/')
    expect(blog.likes).toBe(12)
  })

  test('when likes are not defined they are set to 0', async () => {
    const newBlog = {
      title: 'testBlogNoLikes',
      author: 'testibloggari',
      url: 'http://127.0.0.1/',
    }
    
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('content-Type', /application\/json/)
    const response = await api
      .get('/api/blogs')
      
    const blog = response.body.find(r => r.title === 'testBlogNoLikes')
    expect(blog.likes).toBe(0)
  })

  test('when title is undefined responds with status 400 and new blog is not added', async () => {
    const newBlog = {
      author: 'testibloggari',
      url: 'http://127.0.0.1/',
      likes: 0
    }

    let response = await api
      .get('/api/blogs')
    const blogCountBefore = response.body.length

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    response = await api
      .get('/api/blogs')
    expect(response.body.length).toBe(blogCountBefore)    
  })

  test('when url is undefined responds with status 400 and new blog is not added', async () => {
    const newBlog = {
      title: 'newBlog',
      author: 'testibloggari',
      likes: 0
    }

    let response = await api
      .get('/api/blogs')
    const blogCountBefore = response.body.length

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    response = await api
      .get('/api/blogs')
    expect(response.body.length).toBe(blogCountBefore)    
  })

  test('when title and url are undefined responds with status 400 and new blog is not added', async () => {
    const newBlog = {
      author: 'testibloggari',
      likes: 0
    }

    let response = await api
      .get('/api/blogs')
    const blogCountBefore = response.body.length

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    response = await api
      .get('/api/blogs')
    expect(response.body.length).toBe(blogCountBefore)    
  })
})

afterAll(() => {
  server.close()
})