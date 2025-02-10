import React from 'react'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Benefits from '../components/home/Benefits'
import Pricing from '../components/home/Pricing'


const Home = () => {
  return (
    <div className='pt-20 mx-8 md:mx-16'>
        <Hero/>
        <Features/>
        <Benefits/>
        <Pricing/>
    </div>
  )
}

export default Home