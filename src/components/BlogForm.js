import React, { useState } from 'react'

const BlogForm = ({createBlog}) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title,
      author,
      url
    })

    
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input 
            type="text"
            name='Title'
            value={title}
            onChange={handleTitleChange} 
          />
        </div>
        <div>
          author:
          <input 
            type="text"
            name='Author'
            value={author}
            onChange={handleAuthorChange} 
          />
        </div>
        <div>
          url:
          <input 
            type="text"
            name='URL'
            value={url}
            onChange={handleUrlChange} 
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm