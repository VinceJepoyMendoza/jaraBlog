import React, { useRef } from 'react'

const Footer = () => {
  const year = new Date().getFullYear()
  const footer = useRef(null)
  // Footer top offset
  const rootBody = document.getElementById('root')
  rootBody.style.paddingBottom = `${footer.current?.clientHeight}px`

  return (
    <footer id='main-footer' ref={footer}>
      {/* <p>{footer.current?.clientHeight}</p> */}
      <div className='container'>
        <h4>
          JaraBlog by{' '}
          <a href='https://www.linkedin.com/in/vince-jepoy-mendoza-5b93a6223/'>
            Vince Jepoy Mendoza
          </a>{' '}
          | All rights reserved &copy; {year}.{' '}
        </h4>
      </div>
    </footer>
  )
}

export default Footer
