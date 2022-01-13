import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGlobalContext } from '../context'
import Loader from '../components/Loader'

const Posts = () => {
  const { postId } = useParams()
  const { singlePost, fetchSinglePost, isLoading } = useGlobalContext()

  useEffect(() => {
    fetchSinglePost(postId)
  }, [postId, fetchSinglePost])

  const { _id, title, message, tags, creatorName, isPrivate } = singlePost
  return isLoading ? (
    <Loader />
  ) : (
    <section className='single-post '>
      <div className='container'>
        <div className='single-post-content'>
          <header>
            <span>
              <h2>{title}</h2>
              <p
                style={
                  !isPrivate
                    ? { backgroundColor: '#f999b7' }
                    : { backgroundColor: '#0077b6' }
                }
              >
                {isPrivate ? 'Private' : 'Public'}
              </p>
            </span>
            <Link to={`/user/${_id}`}>{creatorName}</Link>
          </header>
          <div className='single-post-content-tags'>
            {tags?.map((tag, index) => {
              return <small key={index}>#{tag}</small>
            })}
          </div>
          <pre>{message}</pre>
        </div>
      </div>
    </section>
  )
}

export default Posts
