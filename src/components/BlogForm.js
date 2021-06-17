import React from 'react'

const BlogForm = ({
    title,
    handleTitleChange,
    author,
    handleAuthorChange,
    url,
    handleUrlChange,
    createBlog
  }) => {
  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
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