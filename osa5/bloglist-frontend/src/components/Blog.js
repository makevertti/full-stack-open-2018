import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detailsVisible: false
    }
  }

  toggleDetailsVisibility = () => {
    this.setState({ detailsVisible: !this.state.detailsVisible })
  }

  like = () => {
    const blog = this.props.blog
    blog.likes = blog.likes + 1
    blogService.update(blog._id, blog)
    this.setState({ likes: this.state.likes + 1 })
  }

  remove = async () => {
    const blog = this.props.blog
    window.confirm('Delete \'' + blog.title + '\' by ' + blog.author)
    await blogService.remove(blog._id)
    window.location.reload()
  }

  render () {
    const blogDetails = { display: this.state.detailsVisible ? '' : 'none', textIndent: '10px' }
    const blogStyle = {
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5,
    }
    const deleteButtonVisibility = { display: this.props.blog.user.username === this.props.username ? '' : 'none' }

    return (
      <div style={blogStyle}>
        <div onClick={this.toggleDetailsVisibility}>
          {this.props.blog.title} {this.props.blog.author}
        </div>
        <div style={blogDetails}>
          <div>
            <a href={this.props.blog.url}>{this.props.blog.url}</a>
          </div>
          <div>
            {this.props.blog.likes} likes
            <button onClick={this.like}>Like</button>
          </div>
          <div>
            Added by {this.props.blog.user.name}
          </div>
          <button style={deleteButtonVisibility} onClick={this.remove}>Delete</button>
        </div>
      </div>
    )
  }
}

export default Blog