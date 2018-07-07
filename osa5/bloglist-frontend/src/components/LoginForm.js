import React from 'react'
import Notification from './Notification'

const LoginForm = ({ username, password, login, handleFieldChange, error }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <Notification type="error" message={error} />
      <form onSubmit={login}>
        <div>
          Username: <input type="text" name="username" value={username} onChange={handleFieldChange} />
        </div>
        <div>
          Password: <input type="password" name="password" value={password} onChange={handleFieldChange} />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm