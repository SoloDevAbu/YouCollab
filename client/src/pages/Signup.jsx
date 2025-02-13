import React from 'react'
import SignupForm from '../components/signup/SignupForm'
import SingupLeft from '../components/signup/SingupLeft'

const Signup = () => {

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='hidden md:block w-full md:w-1/2 container'>
        <SingupLeft />
      </div>
      <div className='w-full md:w-1/2 container'>
        <SignupForm />
      </div>
    </div>
  )
}

export default Signup