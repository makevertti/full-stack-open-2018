import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
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
      this.setState({user})
      blogService.setToken(user.token)
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
  
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user})
      window.history.pushState(null,null,window.location.href.split('?')[0])
    } catch(exception) {
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
      this.setState({blogs: this.state.blogs.concat(blog)})
      this.setState({
        success: 'A new blog \'' + blogObject.title + '\' by ' + blogObject.author + ' added'
      })
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
      return (
        <div>
          <h2>Log in to application</h2>
          <Notification type="error" message={this.state.error}/>
          <form onSubmit={this.login}>
            <div>
              Username: <input type="text" name="username" value={this.state.username} onChange={this.handleFieldChange}/>
            </div>
            <div>
              Password: <input type="password" name="password" value={this.state.password} onChange={this.handleFieldChange}/>
            </div>
            <div>
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      )
    }

    return (
      <div>
        <h2>Blogs</h2>
        <p>
          {this.state.user.name} logged in 
          <button onClick={this.logout}>Logout</button>
        </p>

        <h3>Create new</h3>
        <Notification type="success" message={this.state.success}/>
        <form onSubmit={this.createBlog}>
          <div>
            Title: <input type="text" name="title" value={this.state.title} onChange={this.handleFieldChange}/>
          </div>
          <div>
            Author: <input type="text" name="author" value={this.state.author} onChange={this.handleFieldChange}/>
          </div>
          <div>
            Url: <input type="text" name="url" value={this.state.url} onChange={this.handleFieldChange}/>
          </div>
          <div>
            <button type="submit">Create</button>
          </div>
        </form>

        {this.state.blogs.map(blog => 
          <Blog key={blog._id} blog={blog}/>
        )}
      </div>
    );
  }
}

export default App;
