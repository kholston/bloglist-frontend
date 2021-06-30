import React, { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(0)


  const blogFormRef = useRef()
  const loginFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedBloglistUser = window.localStorage.getItem('loggedBloglistUser')
    if(loggedBloglistUser){
      const user = JSON.parse(loggedBloglistUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const createNotification = (message, type) => {
    setNotificationMessage(message)
    setNotificationType(type)
    setTimeout(() => {
      setNotificationMessage(null)
      setNotificationType(0)
    }, 5000)
  }

  const handleLogin = async (loginObject) => {
    loginFormRef.current.toggleVisibility()

    try {
      const user = await loginService.login(loginObject)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (error) {
      const errorMessage = 'wrong username or password'
      createNotification(errorMessage, 2)
    }
  }



  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    blogService.setToken(null)
  }

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const savedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(savedBlog))
      const message = `a new blog ${savedBlog.title} by ${savedBlog.author} added`
      createNotification(message, 1)

    } catch (error) {
      createNotification(error.message, 2)
    }
  }

  const updateBlog = async (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const changedBlog = {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    try {
      const updatedBlog = await blogService.update(id, changedBlog)
      setBlogs(blogs.map( blog => blog.id !== id ? blog : updatedBlog))
    } catch (error) {
      createNotification(error.message, 2)
    }
  }

  const deleteBlog = async (blogToDelete) => {
    const remove = window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`)
    if(remove){
      try {
        await blogService.remove(blogToDelete.id)
        setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
        createNotification('Blog deleted successfully', 1)
      } catch (error) {
        createNotification(error.message, 2)
      }
    }
  }


  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} notificationType={notificationType} />

      {user === null ?
        <Togglable buttonLabel='log in' ref={loginFormRef}>
          <LoginForm handleLogin={handleLogin}/>
        </Togglable>
        :
        <div>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm createBlog={createBlog}/>
          </Togglable>
        </div>
      }

      <div id='bloglist'>
        {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            showRemoveButton={!user ?  false: user.name === blog.user.name ?  true: false}
          />
        )}
      </div>
    </div>
  )
}

export default App