import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../context'
import Loader from '../components/Loader'
import { FiEdit3 } from 'react-icons/fi'
import ErrAlert from '../components/login/ErrAlert'

const EditPost = () => {
  const { postId } = useParams()
  const {
    isLoading,
    fetchSinglePost,
    toBeEditPost,
    setToBeEditPost,
    updatePost,
    alertMessage,
    popupAlert,
  } = useGlobalContext()

  useEffect(() => {
    fetchSinglePost(postId)
  }, [fetchSinglePost, postId])

  const { title, isPrivate, tags, message } = toBeEditPost

  const tagsToString = tags.toString().split(',').join(' ')

  return isLoading ? (
    <Loader />
  ) : (
    <section className='edit-post'>
      <form
        className='edit-post-content'
        onSubmit={(e) => {
          e.preventDefault()
          updatePost()
        }}
      >
        <h3>Edit post</h3>
        {/* title */}
        <div>
          <label>
            <small>Title</small>
            <input
              type='text'
              placeholder='Title'
              value={title}
              onChange={(e) =>
                setToBeEditPost({ ...toBeEditPost, title: e.target.value })
              }
            />
          </label>
        </div>
        <div className='edit-post-content-tags'>
          {/* Tags */}
          <label>
            <input
              type='text'
              placeholder='Tags'
              value={tagsToString}
              onChange={(e) =>
                setToBeEditPost({ ...toBeEditPost, tags: e.target.value })
              }
            />
          </label>
          {/* Status */}
          <button
            type='button'
            value={isPrivate}
            className='btn'
            onClick={(e) =>
              setToBeEditPost({ ...toBeEditPost, isPrivate: !isPrivate })
            }
          >
            {isPrivate ? 'Private' : 'Public'}
          </button>
        </div>
        <div>
          <label>
            <small>Description</small>
            <textarea
              value={message}
              onChange={(e) =>
                setToBeEditPost({ ...toBeEditPost, message: e.target.value })
              }
            ></textarea>
          </label>
        </div>
        <div>
          <label className='edit-post-content-edit'>
            <input type='submit' value='Update post' className='btn' />
            <FiEdit3 />
          </label>
        </div>
        {alertMessage?.show && (
          <ErrAlert {...alertMessage} removeAlert={popupAlert} />
        )}
      </form>
    </section>
  )
}

export default EditPost
