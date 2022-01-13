import React, { useEffect, useRef } from 'react'
import { BsArrowUpCircle } from 'react-icons/bs'

export default function ScrollTopBtn() {
  const scrollBtn = useRef(null)
  useEffect(() => {
    const scroll = window.addEventListener('scroll', scrollListener)

    // Event listener clean up
    return () => scroll?.removeEventListener('scroll', scrollListener)
  }, [])

  const scrollListener = () => {
    if (window.scrollY > 100) {
      scrollBtn.current.style.transform = 'translateX(-0.5rem)'
    } else {
      scrollBtn.current.style.transform = 'translateX(calc(100% + 1rem))'
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button className='btn btn-scrollTop' ref={scrollBtn} onClick={scrollToTop}>
      <BsArrowUpCircle />
    </button>
  )
}
