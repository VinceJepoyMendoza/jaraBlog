import React, { useRef } from 'react'
import loginImg from '../img/loginImg.svg'
import ErrAlert from '../components/login/ErrAlert'
import { useGlobalContext } from '../context'

const Login = () => {
  const token = localStorage.getItem('jaraToken')
  const { loginAccount, alertMessage, popupAlert } = useGlobalContext()
  const userName = useRef(null)
  const password = useRef(null)

  const handleLogin = (e) => {
    e.preventDefault()
    const user = userName.current.value,
      pass = password.current.value
    loginAccount(user, pass)
  }

  // Redirect to home if logged in
  token && window.open('/home', '_self')

  return (
    <>
      <section className='login'>
        <div className='login-content'>
          <img src={loginImg} alt='Login' />
          <form onSubmit={handleLogin}>
            <div>
              <input
                type='text'
                name='username'
                ref={userName}
                placeholder='Email'
              />
            </div>
            <div>
              <input
                type='password'
                name='password'
                ref={password}
                placeholder='password'
              />
            </div>
            <div>
              <input type='submit' value='submit' className='btn' />
            </div>
            <small>
              Do not have an account? <a href='/register'>Register</a>
            </small>
            {alertMessage?.show && (
              <ErrAlert {...alertMessage} removeAlert={popupAlert} />
            )}
          </form>
        </div>
      </section>
    </>
  )
}

export default Login
