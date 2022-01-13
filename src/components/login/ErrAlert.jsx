import React, { useEffect } from 'react'

const ErrAlert = ({ msg, removeAlert, status }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert()
    }, 3000)

    return () => clearTimeout(timeout)
  }, [removeAlert])

  return (
    <div className={`popup-alert popup-${status}`}>
      <small>{msg}</small>
    </div>
  )
}

export default ErrAlert
