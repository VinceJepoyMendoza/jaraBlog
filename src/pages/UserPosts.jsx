import React, { useEffect } from 'react'
import Post from '../components/home/posts/Post'
import Loader from '../components/Loader'
import { useGlobalContext } from '../context'

const Posts = () => {
  const {
    isLoading,
    userAllPosts,
    fetchUserAllPosts,
    currUser,
    getCurrUserInfo,
  } = useGlobalContext()

  useEffect(() => {
    getCurrUserInfo()
    if (currUser._id) fetchUserAllPosts(currUser._id)
  }, [fetchUserAllPosts, getCurrUserInfo, currUser._id])

  return isLoading ? (
    <Loader />
  ) : (
    <section className='user-posts'>
      <div className='container'>
        <div className='user-posts-content'>
          <h2>Your posts</h2>
          {userAllPosts.map((post) => {
            return <Post key={post._id} post={post} />
          })}
        </div>
      </div>
    </section>
  )
}

export default Posts
