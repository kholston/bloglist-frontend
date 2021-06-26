import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const updateBlogHandler = jest.fn()
  const deleteBlogHandler = jest.fn()
  const showRemoveButton = true

  beforeEach(() => {
    const blog = {
      title: 'Test blog',
      author: 'Tester',
      url: 'www.example.com',
      user: {
        name: 'Test User',
        username: 'testUser'
      }
    }

    component = render(
      <Blog
        blog={blog}
        updateBlog={updateBlogHandler}
        deleteBlog={deleteBlogHandler}
        showRemoveButton={showRemoveButton}
      />
    )
  })

  test('at the start  renders blog title and author', () => {
    const blogTitle = component.container.querySelector('.blogTitle')
    expect(blogTitle).toHaveTextContent('Test blog Tester')

    const hideButton = component.getByText('hide')
    expect(hideButton).toHaveStyle('display: none')

    const blogInfo = component.container.querySelector('.blogInfo')
    expect(blogInfo).toHaveStyle('display: none')
  })

  test('when view button is clicked the url and number of likes are shown', () => {
    const blogInfo = component.container.querySelector('.blogInfo')
    expect(blogInfo).toHaveStyle('display: none')

    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    expect(blogInfo).not.toHaveStyle('display: none')
  })

  test('cliking the like button twice calls event handler twice', () => {
    const viewButton = component.getByText('view')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(updateBlogHandler.mock.calls).toHaveLength(2)
  })

})