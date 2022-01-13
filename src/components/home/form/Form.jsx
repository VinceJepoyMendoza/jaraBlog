import React, { useState } from 'react'
import ErrAlert from '../../login/ErrAlert'
import { useGlobalContext } from '../../../context'

const Form = ({ isModalOpen, setIsModalOpen }) => {
  const { createNewPost, alertMessage, popupAlert } = useGlobalContext()
  const [title, setTitle] = useState(''),
    [tags, setTags] = useState(''),
    [description, setDescription] = useState(''),
    [isPrivate, setIsPrivate] = useState(false)

  const setters = {
    setTitle,
    setTags,
    setDescription,
    setIsPrivate,
    setIsModalOpen,
  }

  const handlePost = async (e) => {
    // String to Tags - seperated by space ' '
    let newTags = tags.split(' ')
    createNewPost(title, newTags, isPrivate, description, setters)
    e.preventDefault()
  }

  return (
    isModalOpen && (
      <aside className='home-form'>
        <h2>New post</h2>
        <form onSubmit={handlePost}>
          <div>
            <label>
              <input
                type='text'
                value={title}
                placeholder='Title'
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
          </div>
          <div className='home-form-split'>
            <label>
              <input
                type='text'
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder='Tags (seperated by space)'
              />
            </label>
            <button
              type='button'
              className='btn btn-post-form'
              value={isPrivate}
              onClick={() => setIsPrivate(!isPrivate)}
            >
              {isPrivate ? 'Private' : 'Public'}
            </button>
          </div>
          <div>
            <span>Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label>
              <input type='submit' value='Post' className='btn' />
            </label>
          </div>
          {alertMessage.show && (
            <ErrAlert {...alertMessage} removeAlert={popupAlert} />
          )}
        </form>
      </aside>
    )
  )
}

export default Form
