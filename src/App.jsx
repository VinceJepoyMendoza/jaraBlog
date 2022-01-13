import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Pages
import NotFound from './pages/NotFound'
import Welcome from './pages/Welcome'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/User'
import UserPosts from './pages/UserPosts'
import EditPost from './pages/EditPost'
import SinglePost from './pages/SinglePost'
// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollTopBtn from './components/ScrollTopBtn'

import { useGlobalContext } from './context'

const App = () => {
  const { getCurrUserInfo, fetchPublicPosts } = useGlobalContext()
  const token = localStorage.getItem('jaraToken')

  useEffect(() => {
    if (token) {
      fetchPublicPosts()
      getCurrUserInfo()
    }
  }, [token, fetchPublicPosts, getCurrUserInfo])

  return (
    <>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/home' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/user/posts' element={<UserPosts />} />
            <Route path='/user/:userId' element={<Profile />} />
            <Route path='/posts/:postId' element={<SinglePost />} />
            <Route path='/posts/edit/:postId' element={<EditPost />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <ScrollTopBtn />
        </main>
        <Footer />
      </Router>
    </>
  )
}
export default App
