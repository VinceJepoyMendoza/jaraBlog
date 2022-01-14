import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGlobalContext } from '../context'
import Loader from '../components/Loader'
import userImg from '../img/user.svg'
import Post from '../components/home/posts/Post'

const User = () => {
  const {
    currUser,
    certainUser,
    isLoading,
    fetchUserAllPosts,
    userAllPosts,
    fetchCertainUserInfo,
  } = useGlobalContext()
  let { userId } = useParams()
  const { name, email, isAdmin } = certainUser
  const [seeMore, setSeeMore] = useState(true)

  useEffect(() => {
    if (userId === 'profile') {
      if (currUser._id) {
        fetchUserAllPosts(currUser._id)
        fetchCertainUserInfo(currUser._id)
      }
    } else {
      fetchUserAllPosts(userId)
      fetchCertainUserInfo(userId)
    }
  }, [fetchUserAllPosts, userId, fetchCertainUserInfo, currUser._id])

  // All posts
  const collapse = userAllPosts.map((post, index) => {
    return <Post post={post} key={index} />
  })

  const nonCollapse = userAllPosts.map((post, index) => {
    return index < 2 && <Post post={post} key={index} />
  })

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <img src={userImg} alt='user' className='user-page-img' />
      <section className='user-page container'>
        <h2>User's Info</h2>
        {/* User info */}
        <div className='user-page-info'>
          <table>
            <tbody>
              <tr>
                <td>Name:</td>
                <td className='value'>{name}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td className='value'>{email}</td>
              </tr>
              <tr>
                <td>isAdmin:</td>
                <td className='value'>{isAdmin ? 'Yes' : 'No'}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3>latest posts</h3>
        {/* Latest post */}
        <div className='user-page-seeMore'>
          {seeMore ? nonCollapse : collapse}
          {/* Only show collapse button if user's post are more than two */}
          {userAllPosts.length > 2 && (
            <button
              type='button'
              title='See more posts'
              className='btn btn-see-more'
              onClick={() => setSeeMore(!seeMore)}
            >
              {seeMore ? 'See more' : 'See less'}
            </button>
          )}
        </div>
      </section>
    </>
  )
}

export default User
