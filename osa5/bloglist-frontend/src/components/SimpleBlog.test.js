import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  it('renders content', () => {
    const blog = {
      title: 'test blog',
      author: 'test blogger',
      likes: 146
    }

    const simpleBlogComponent = shallow(<SimpleBlog blog={blog} />)
    const titleAndAuthor = simpleBlogComponent.find('.titleAndAuthor')
    const likes = simpleBlogComponent.find('.likes')

    expect(titleAndAuthor.text()).toContain(blog.title)
    expect(titleAndAuthor.text()).toContain(blog.author)
    expect(likes.text()).toContain(blog.likes)
  })

  it('calls like buttons event handler function on press', () => {
    const blog = {
      title: 'test blog',
      author: 'test blogger',
      likes: 146
    }

    const mockHandler = jest.fn()

    const simpleBlogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)

    const button = simpleBlogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})