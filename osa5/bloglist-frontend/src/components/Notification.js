import React from 'react'
import PropTypes from 'prop-types'

const error = { color: 'red', border: '3px solid red', width: '25%'}
const success = { color: 'green', border: '3px solid green', width: '25%'}

const Notification = (props) => {
  if (props === null || props.message === undefined || props.message === null) {
    return null
  } else if (props.type === "error") {
    return (
      <p style={error}>
        {props.message}
      </p>
    )
  } else {
    return (
      <p style={success}>
        {props.message}
      </p>
    )
  }
}

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string
}

export default Notification