import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(0)

  const [title, setTitle] = useState('')
  const [author, setAuthor ]= useState('')
  const [url, setUrl] = useState('')
  
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
    setTimeout(()=>{
      setNotificationMessage(null)
      setNotificationType(0)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try { 
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      const errorMessage = 'wrong username or password'
      createNotification(errorMessage, 2)
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    blogService.setToken(null)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const createBlog = async (event) => {
    event.preventDefault()

    try {
    const savedBlog = await blogService.create({
      title,
      author,
      url
    })
    setBlogs(blogs.concat(savedBlog))
    const message = `a new blog ${savedBlog.title} by ${savedBlog.author} added`
    createNotification(message, 1)
    setTitle('')
    setAuthor('')
    setUrl('')
      
    } catch (error) {
      createNotification(error.message, 2)
    }
  }

  return (
    <div>
      <Notification message={notificationMessage} notificationType={notificationType} />
      
          {user === null ?
      <LoginForm 
        username={username}
        handleUsernameChange={handleUsernameChange}
        password={password}
        handlePasswordChange={handlePasswordChange}
        handlelogin={handleLogin}
      />  :
      <div>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
        <BlogForm 
          title={title}
          handleTitleChange={handleTitleChange}
          author={author}
          handleAuthorChange={handleAuthorChange}
          url={url}
          handleUrlChange={handleUrlChange}
          createBlog={createBlog}
        />
        <div>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      </div>
    }
    </div>
  )
}

export default App