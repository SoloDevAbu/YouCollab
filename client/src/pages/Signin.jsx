import React from 'react'
import LoginLeft from '../components/login/LoginLeft'
import LoginForm from '../components/login/LoginForm'

const Signin = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='hidden md:block w-full md:w-1/2 container'>
        <LoginLeft/>
      </div>
      <div className='w-full md:w-1/2 container'>
        <LoginForm/>
      </div>
    </div>
  )
}

export default Signin