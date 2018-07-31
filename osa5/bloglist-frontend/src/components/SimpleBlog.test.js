import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
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
})