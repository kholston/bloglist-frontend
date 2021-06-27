import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm' 

describe('<BlogForm />', () => {
  let component
  let createBlogHandler

  beforeEach(() => {
    createBlogHandler = jest.fn()

    component = render(
      <BlogForm createBlog={createBlogHandler}/>
    )
  })

  test('updates parent state and calls create blog', () => {
    const blogForm  = component.container.querySelector('form')
    const titleInput = component.getByRole('textbox', { name: 'title' })
    const authorInput = component.getByRole('textbox', { name: 'author' })
    const urlInput = component.getByRole('textbox', { name: 'url' })

    fireEvent.change(titleInput, { target: { value: 'Blog Title' } })
    fireEvent.change(authorInput, { target: { value: 'Blog Author' } })
    fireEvent.change(urlInput, { target: { value: 'Blog URL' } })
    fireEvent.submit(blogForm)

    expect(createBlogHandler.mock.calls).toHaveLength(1)
    expect(createBlogHandler.mock.calls[0][0].title).toBe('Blog Title')
    expect(createBlogHandler.mock.calls[0][0].author).toBe('Blog Author')
    expect(createBlogHandler.mock.calls[0][0].url).toBe('Blog URL')
  })
})