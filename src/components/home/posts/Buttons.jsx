import React, { useState } from 'react'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin7Line } from 'react-icons/ri'
import { HiDotsHorizontal } from 'react-icons/hi'
import { useGlobalContext } from '../../../context'
import { Link } from 'react-router-dom'

const Buttons = ({ post }) => {
  const { _id, createdBy } = post
  const { currUser, deletePost } = useGlobalContext()
  const [openOption, setOpenOption] = useState(false)

  if (createdBy !== currUser._id) return null

  return (
    <div className='btn-post-options'>
      <button
        className='btn btn-option'
        title='Open option'
        onClick={() => setOpenOption(!openOption)}
      >
        <HiDotsHorizontal />
      </button>
      <div style={openOption ? { display: 'flex' } : { display: 'none' }}>
        <Link
          to={`/posts/edit/${_id}`}
          className='btn btn-post btn-post-edit'
          title='Edit post'
        >
          <FiEdit />
        </Link>
        <button
          type='button'
          className='btn btn-post btn-post-delete'
          title='Delete post'
          onClick={() => deletePost(_id)}
        >
          <RiDeleteBin7Line />
        </button>
      </div>
    </div>
  )
}

export default Buttons
