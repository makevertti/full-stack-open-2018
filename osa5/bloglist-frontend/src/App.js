import React from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: "",
      password: "",
      title: "",
      author: "",
      url: ""
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
      window.history.pushState(null, null, window.location.href.split('?')[0])
    } catch (exception) {
      this.setState({
        error: 'Wrong username or password'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  createBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      }
      const blog = await blogService.create(blogObject)
      this.setState({ blogs: this.state.blogs.concat(blog) })
      this.setState({
        success: 'A new blog \'' + blogObject.title + '\' by ' + blogObject.author + ' added'
      })
      this.setState({ title: '', author: '', url: '' })
      setTimeout(() => {
        this.setState({ success: null })
      }, 5000)
    } catch (exception) {
      console.log(exception)
    }
  }

  logout = () => {
    window.localStorage.removeItem('loggedUser')
    window.location.reload()
  }

  render() {
    if (this.state.user === null) {
      return <LoginForm 
              username={this.state.username} 
              password={this.state.password} 
              login={this.login} 
              handleFieldChange={this.handleFieldChange} 
              error={this.state.error} />
    }

    return (
      <div>
        <h2>Blogs</h2>
        <p>
          {this.state.user.name} logged in
          <button onClick={this.logout}>Logout</button>
        </p>

        <NewBlogForm 
        title={this.state.title} 
        author={this.state.author} 
        url={this.state.url} 
        createBlog={this.createBlog} 
        handleFieldChange={this.handleFieldChange} 
        success={this.state.success} />

        {this.state.blogs
        .sort((a,b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog._id} blog={blog} username={this.state.user.username}/>
        )}
      </div>
    )
  }
}

export default App
