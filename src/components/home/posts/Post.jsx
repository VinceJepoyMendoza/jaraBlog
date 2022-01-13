import React from 'react'
import Message from './Message'
import { Link } from 'react-router-dom'
import Buttons from './Buttons'

const Post = ({ post }) => {
  const {
    _id,
    message,
    title,
    tags,
    createdAt,
    creatorName,
    isPrivate,
    createdBy,
  } = post
  const newCreatedAt = new Date(createdAt)
  const year = newCreatedAt.getFullYear()
  const day = newCreatedAt.getDate()

  const convertedMonth = () => {
    const month = newCreatedAt.getMonth() + 1
    switch (month) {
      case 1:
        return 'Jan'
      case 2:
        return 'Feb'
      case 3:
        return 'Mar'
      case 4:
        return 'Apr'
      case 5:
        return 'May'
      case 6:
        return 'Jun'
      case 7:
        return 'Jul'
      case 8:
        return 'Aug'
      case 9:
        return 'Sept'
      case 10:
        return 'Oct'
      case 11:
        return 'Nov'
      case 12:
        return 'Dec'
      default:
        return 'Error'
    }
  }

  return (
    <article className='home-posts-item'>
      {/* Buttons */}
      <Buttons post={post} />
      {/* Heading/Info */}
      <div>
        <div className='home-posts-item-header'>
          {/* Title */}
          <Link
            to={`/posts/${_id}`}
            title='See post'
            className='home-posts-item-title'
          >
            {title}
          </Link>
        </div>
        <div className='home-posts-item-second'>
          <Link to={`/user/${createdBy}`} className='home-posts-item-creator'>
            {creatorName}
          </Link>
          <small className='home-posts-item-date'>
            {convertedMonth()} {day}, {year}
          </small>
          {isPrivate && <small className='badge'>Private</small>}
        </div>
        {/* Tags */}
        <div className='home-posts-item-tag'>
          {tags.map((tag, index) => {
            return <small key={index}>#{tag}</small>
          })}
        </div>
      </div>
      {/* Post's message/description */}
      <Message message={message} />
    </article>
  )
}

export default Post
