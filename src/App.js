import React, { useState, useEffect } from 'react'
import Bloglist from './components/Bloglist'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

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
      setErrorMessage('Wrong credentials')
      setTimeout(()=>{
        setErrorMessage(null)
      },5000)
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

  return (
    <div>
      <Notification message={errorMessage} />
      
          {user === null ?
      <LoginForm 
        username={username}
        handleUsernameChange={handleUsernameChange}
        password={password}
        handlePasswordChange={handlePasswordChange}
        handlelogin={handleLogin}
      />  :
      <div>
        <button onClick={handleLogout}>logout</button>
        <Bloglist blogs={blogs}/>
      </div>
    }
    </div>
  )
}

export default App