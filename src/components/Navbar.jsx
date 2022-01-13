import React from 'react'
import { Link } from 'react-router-dom'
import { IoMdPerson } from 'react-icons/io'
import { RiArticleFill } from 'react-icons/ri'
import { useGlobalContext } from '../context'

const Navbar = () => {
  const token = localStorage.getItem('jaraToken')
  const { logoutAccount } = useGlobalContext()

  return (
    <nav className='main-nav'>
      <div className='logo'>
        <h2>
          <Link to='/home'>JaraBlog</Link>
        </h2>
      </div>
      <ul>
        {!token ? (
          <>
            <li>
              <Link to='/login' title='Login account'>
                Login
              </Link>
            </li>
            <li>
              <Link to='/register' title='Register account'>
                Register
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/user/posts' title='Go to your posts'>
                <RiArticleFill />
              </Link>
            </li>
            <li>
              <Link to='/user/profile' title='Profile Settings'>
                <IoMdPerson />
              </Link>
            </li>
            <li>
              <Link to='/' title='Log out account' onClick={logoutAccount}>
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
