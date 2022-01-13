import React from 'react'
import { Link } from 'react-router-dom'
import welcomeImg from '../img/welcome.svg'

const Welcome = () => {
  return (
    <>
      <img src={welcomeImg} alt='welcome' className='welcome-img' />
      <section className='welcome'>
        <div className='container'>
          <h1>
            Jara<span>Blog</span>, the blog on the <span>go!</span>
          </h1>
          <div className='welcome-buttons'>
            <Link
              to='/login'
              title='login'
              className='btn btn-welcome btn-welcome-login'
            >
              Login Account
            </Link>
            <Link
              to='/register'
              title='login'
              className='btn btn-welcome btn-welcome-register'
            >
              Register new account
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Welcome
