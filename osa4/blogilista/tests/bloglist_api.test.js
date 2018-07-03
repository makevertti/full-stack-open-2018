const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const testHelper = require('./test_helper')

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
const deleteBlog = {
  title: 'deleteBlog',
  author: 'testBlogger',
  url: 'http://127.0.0.1/',
  likes: 0
}
const updateBlog = {
  title: 'updateBlog',
  author: 'testBlogger',
  url: 'http://127.0.0.1/',
  likes: 0
}

const defaultUser = {
  username: 'defaultUser',
}

beforeAll(async () => {
  await Blog.remove({})
  await new Blog(newBlog1).save()
  await new Blog(newBlog2).save()
  await new Blog(deleteBlog).save()
  await new Blog(updateBlog).save()


  await User.remove({})
  await new User(defaultUser).save()
})

describe('get blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('correct number of blogs is returned', async () => {
    const blogs = await testHelper.blogsInDb()
    const response = await api
      .get('/api/blogs')
    expect(response.body.length).toBe(blogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api
      .get('/api/blogs')
    const blog = response.body.find(r => r.title === 'defaultBlog1')
    expect(testHelper.formatBlog(blog)).toEqual(newBlog1)
  })
})

describe('add blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'addBlog',
      author: 'testBlogger',
      url: 'http://127.0.0.1/',
      likes: 12
    }
    
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('content-Type', /application\/json/)
    const blogs = await testHelper.blogsInDb()
    expect(blogs).toContainEqual(newBlog)
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

    const blogsBefore = await testHelper.blogsInDb()
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAfter = await testHelper.blogsInDb()
    expect(blogsAfter.length).toBe(blogsBefore.length)
  })

  test('when url is undefined responds with status 400 and new blog is not added', async () => {
    const newBlog = {
      title: 'newBlog',
      author: 'testibloggari',
      likes: 0
    }

    const blogsBefore = await testHelper.blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAfter = await testHelper.blogsInDb()
    expect(blogsAfter.length).toBe(blogsBefore.length)
  })

  test('when title and url are undefined responds with status 400 and new blog is not added', async () => {
    const newBlog = {
      author: 'testibloggari',
      likes: 0
    }

    const blogsBefore = await testHelper.blogsInDb()

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAfter = await testHelper.blogsInDb()
    expect(blogsAfter.length).toBe(blogsBefore.length)
  })
})

describe('delete blog', () => {
  test('after deleting a blog it disappears from database', async () => {
    await api
      .delete('/api/blogs/' + await testHelper.getBlogIdByTitle(deleteBlog.title))
      .expect(204)

    expect(await testHelper.blogsInDb()).not.toContainEqual(deleteBlog)
  })

  test('deleting a nonexisting blog should fail with status 400', async () => {
    await api
      .delete('/api/blogs/0')
      .expect(400)
  })
})

describe('update blog', () => {
  test('updating one field works', async () => {
    const newBlog = {
      title: updateBlog.title,
      author: updateBlog.author,
      url: updateBlog.url,
      likes: 128
    }

    const updateBlogId = await testHelper.getBlogIdByTitle(updateBlog.title)

    await api
      .put('/api/blogs/' + updateBlogId)
      .send(newBlog)
      .expect(200)

    const blog = await Blog.findById(updateBlogId)

    expect(testHelper.formatBlog(blog)).toEqual(newBlog)
  })

  test('updating multiple fields works', async () => {
    const newBlog = {
      title: "UPDATE",
      author: "NEW author",
      url: "-",
      likes: 256
    }

    const updateBlogId = await testHelper.getBlogIdByTitle(updateBlog.title)

    await api
      .put('/api/blogs/' + updateBlogId)
      .send(newBlog)
      .expect(200)

    const blog = await Blog.findById(updateBlogId)

    expect(testHelper.formatBlog(blog)).toEqual(newBlog)
  })

  test('trying to update with invalid id should fail with status 400', async () => {
    await api
      .put('/api/blogs/0')
      .expect(400)
  })
})

describe('add user', async () => {
  test('adding user succeeds with a fresh username', async () => {
    const usersBeforeOperation = await testHelper.usersInDb()

    const newUser = {
      username: 'newUser',
      name: 'New User',
      password: 'passpass'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await testHelper.usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1)
    const usernames = usersAfterOperation.map(u=>u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('when using existing username new user should not be added', async () => {
    const usersBeforeOperation = await testHelper.usersInDb()

    const newUser = {
      username: 'defaultUser',
      name: 'New Default',
      password: 'pass'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(422)
    
    expect(response.body).toEqual({error: 'username must be unique'})

    const usersAfterOperation = await testHelper.usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })

  test('when using too short password new user should not be added', async () => {
    const usersBeforeOperation = await testHelper.usersInDb()

    const newUser = {
      username: 'user',
      name: 'User',
      password: 'ye'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(422)
    
    expect(response.body.error).toBe('password must be at least 3 characters long')

    const usersAfterOperation = await testHelper.usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
  })
})

afterAll(() => {
  server.close()
})