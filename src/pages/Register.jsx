import React, { useRef } from 'react'
import registerImg from '../img/register.jpg'
import ErrAlert from '../components/login/ErrAlert'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context'

const Register = () => {
  const { registerAccount, alertMessage, popupAlert } = useGlobalContext()
  const navigate = useNavigate()
  const email = useRef(''),
    initPass = useRef(''),
    confPass = useRef(''),
    name = useRef('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newEmail = email.current.value,
      newInitPass = initPass.current.value,
      newConfPass = confPass.current.value,
      newName = name.current.value

    newInitPass !== newConfPass
      ? popupAlert(true, 'Passwords does not match')
      : registerAccount(newName, newEmail, newInitPass, newConfPass, navigate)
  }

  return (
    <>
      <img src={registerImg} alt='register' className='register-img' />
      <section className='register'>
        <aside>
          <h1>
            Create blogs and articles to experience jara<span>Blog</span> by
            making an account.
          </h1>
        </aside>
        <form onSubmit={handleSubmit}>
          <h3>Register new account</h3>
          <div>
            <label>
              <input type='text' placeholder='Enter name' ref={name} />
            </label>
          </div>
          <div>
            <label>
              <input type='text' placeholder='Enter email' ref={email} />
            </label>
          </div>
          <div>
            <label>
              <input
                type='password'
                placeholder='Enter password'
                ref={initPass}
              />
            </label>
          </div>
          <div>
            <label>
              <input
                type='password'
                placeholder='Confirm password'
                ref={confPass}
              />
            </label>
          </div>
          <div>
            <input type='submit' value='Create account' className='btn' />
          </div>
          {alertMessage.show && (
            <ErrAlert {...alertMessage} removeAlert={popupAlert} />
          )}
        </form>
      </section>
    </>
  )
}

export default Register

// Register account form
