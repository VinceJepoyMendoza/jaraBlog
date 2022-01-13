import React from 'react'
import Post from './Post'
import { useGlobalContext } from '../../../context'

const Posts = () => {
  const { publicPosts } = useGlobalContext()

  return (
    <div className='container'>
      <div className='home-posts'>
        {publicPosts.map((post) => {
          return <Post post={post} key={post._id} />
        })}
      </div>
    </div>
  )
}

export default Posts
