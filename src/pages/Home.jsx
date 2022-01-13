import React, { useState } from 'react'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { useGlobalContext } from '../context'
import { Navigate } from 'react-router-dom'
import Posts from '../components/home/posts/Posts'
import Form from '../components/home/form/Form'
import Loader from '../components/Loader'

const Home = () => {
  // Prohibit showing of post for unauthorized user
  const { isLoading } = useGlobalContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isLoggedIn = localStorage.getItem('jaraToken')

  if (!isLoggedIn) {
    return <Navigate to='/login' />
  } else if (isLoading) {
    return <Loader />
  } else {
    return (
      <section className='home'>
        <header>
          <h3>Latest posts</h3>
          <button
            type='button'
            className='btn btn-post-modal'
            title='Add new post'
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <AiOutlinePlusCircle />
            Add new post
          </button>
        </header>
        <Form isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        <Posts />
      </section>
    )
  }
}

export default Home
