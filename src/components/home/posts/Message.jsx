import React from 'react'

const Message = ({ message }) => {
  // const [readMore, setReadMore] = useState(false)
  return (
    <div className='home-posts-item-message'>
      <pre>{message}</pre>
    </div>
  )
}

export default Message
