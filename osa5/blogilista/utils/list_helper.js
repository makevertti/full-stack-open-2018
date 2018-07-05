const dummy = (blogs) => {
  return 1
}

const totalLikeReducer = (totalLikes, blog) => totalLikes + blog.likes
const totalLikes = (blogs) => {
  return blogs.reduce(totalLikeReducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length < 1) return {}

  let result = {
    title: '',
    author: '',
    likes: 0
  }

  const favoriteBlogReducer = (previous, current) => (current.likes > previous.likes) ? current : previous
  const favoriteBlog = blogs.reduce(favoriteBlogReducer, result)
  result.title = favoriteBlog.title
  result.author = favoriteBlog.author
  result.likes = favoriteBlog.likes

  return result
}

const mostBlogs = (blogs) => {
  if (blogs.length < 1) return {}
  let numberOfBlogs = {}

  blogs.forEach(blog => {
    if (isNaN(numberOfBlogs[blog.author])) numberOfBlogs[blog.author] = 0
    numberOfBlogs[blog.author] += 1
  });

  let result = {
    author: '',
    blogs: 0
  }
  result.author = Object.keys(numberOfBlogs).reduce((previous, current) => (current > previous) ? current : previous)
  result.blogs = numberOfBlogs[result.author]
  return result
}

const mostLikes = (blogs) => {
  if (blogs.length < 1) return {}

  let numberOfLikes = {}

  blogs.forEach(blog => {
    if (isNaN(numberOfLikes[blog.author])) numberOfLikes[blog.author] = 0
    numberOfLikes[blog.author] += blog.likes
  })

  let result = {
    author: '',
    likes: 0
  }
  result.author = Object.keys(numberOfLikes).reduce((previous, current) => (current > previous) ? current : previous)
  result.likes = numberOfLikes[result.author]
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}