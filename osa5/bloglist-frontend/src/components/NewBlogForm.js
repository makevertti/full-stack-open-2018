import React from 'react'
import Notification from './Notification'
import PropTypes from 'prop-types'

class NewBlogForm extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    createBlog: PropTypes.func.isRequired,
    handleFieldChange: PropTypes.func.isRequired,
    success: PropTypes.string
  }
  constructor(props) {
    super(props)
    this.state = {
      formVisible: false
    }
  }

  toggleNewBlogFormVisibility = () => {
    this.setState({ formVisible: !this.state.formVisible })
  }

  render() {
    const hideWhenVisible = { display: this.state.formVisible ? 'none' : '' }
    const showWhenVisible = { display: this.state.formVisible ? '' : 'none' }
    return (
      <div>
        <Notification type="success" message={this.props.success} />
        <div style={hideWhenVisible}>
          <button onClick={this.toggleNewBlogFormVisibility}>Create new</button>
        </div>
        <div style={showWhenVisible}>
          <h3>Create new</h3>
          <form onSubmit={this.props.createBlog}>
            <div>
              Title: <input type="text" name="title" value={this.props.title} onChange={this.props.handleFieldChange} />
            </div>
            <div>
              Author: <input type="text" name="author" value={this.props.author} onChange={this.props.handleFieldChange} />
            </div>
            <div>
              Url: <input type="text" name="url" value={this.props.url} onChange={this.props.handleFieldChange} />
            </div>
            <div>
              <button type="submit" onClick={this.toggleNewBlogFormVisibility}>Create</button>
            </div>
          </form>
          <button onClick={this.toggleNewBlogFormVisibility}>Cancel</button>
        </div>
        <p />
      </div>
    )
  }
}

export default NewBlogForm