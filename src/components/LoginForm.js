import React from 'react'

const LoginForm = ({username, handleUsernameChange, password, handlePasswordChange, handlelogin}) => {
  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handlelogin}>
        <div>
          username
          <input 
            type="text" 
            value={username}
            name='Username'
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input 
            type="password" 
            name="Password" 
            value={password}
            onChange={handlePasswordChange}  
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm