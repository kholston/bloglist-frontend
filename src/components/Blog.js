import React, {useState} from 'react'
const Blog = ({blog, updateBlog, deleteBlog}) => {

const [visible, setVisible] = useState(false)

const hideWhenVisible = {display: visible ? 'none': ''}
const showWhenVisible = {display: visible ? '': 'none'}

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const toggleVisibility = () => {
  setVisible(!visible)
}


  return(
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button style={hideWhenVisible} onClick={toggleVisibility}>view</button>
        <button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes} <button onClick={() => updateBlog(blog.id)}>like</button>
        </div>
        <div>{blog.user.name}</div> 
        <button onClick={() => deleteBlog(blog)}>remove</button>
      </div>  
    </div>
  )
}

export default Blog