import React from 'react'
import Notification from './Notification'
import PropTypes from 'prop-types'

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

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  handleFieldChange: PropTypes.func.isRequired,
  error: PropTypes.string,
}

export default LoginForm