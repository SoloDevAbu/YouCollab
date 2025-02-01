import React from 'react'
import { useSearchParams } from 'react-router-dom';
import YoutuberDashboardLeft from '../components/dashboard/youtuber/YoutuberDashboardLeft';
import YoutuberDashboardRight from '../components/dashboard/youtuber/YoutuberDashboardRight';

const YoutuberDashboard = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedOption = searchParams.get('tab') || 'recent-uploads';
  
  return (
    <div className='md:flex justify-center pt-12'>
      <div className='hidden md:block md:w-1/4'>
        <YoutuberDashboardLeft setSearchParams={setSearchParams} />
      </div>
      <div className='hidden md:w-px bg-gray-300 mx-4 h-screen'></div>
      <div className='md:w-3/4'>
        <YoutuberDashboardRight selectedOption={selectedOption} />
      </div>
    </div>
  )
}

export default YoutuberDashboard