import React, { useState } from 'react'
import banner from '../../assets/channels4_banner.jpg'
import profile from '../../assets/channels4_profile.jpg'
import channelNotFound from '../../assets/NoChannel.png'

const YoutuberChannel = () => {
    const [channelInfo, setChannelInfo] = useState('');

    const handleAddChannel = () => {

    }

    const handleSignout = () => {

    }

    return (
        <div className='m-4 p-4 border-2 border-gray-700 rounded-lg shadow-md shadow-gray-700'>
            {channelInfo ? (
                <div>
                    <div className='mb-4'>
                        <img src={banner} alt="" className='rounded-xl' />
                    </div>
                    <div className='flex gap-6'>
                        <div>
                            <img src={profile} alt="" className='rounded-full' />
                        </div>
                        <div>
                            <h1 className='text-lg font-bold'>100xDevs</h1>
                            <h3 className='font-semibold'>@100xDevsYT</h3>
                            <div className='flex gap-4'>
                                <h3 className='font-semibold'>35.3K Subscribers</h3>
                                <h3 className='font-semibold'>60 Videos</h3>
                            </div>
                        </div>
                    </div>
                    <div className='mt-8 flex justify-center'>
                        <button className='text-xl font-bold border-2 border-gray-700 rounded-lg shadow-md shadow-gray-600 px-6 py-2 md:px-16 hover:bg-gray-300'
                            onClick={handleSignout}
                        >
                            Sign Out</button>
                    </div>
                </div>
            ) : (
                <div className='flex flex-col justify-center items-center gap-6'>
                    <img src={channelNotFound} alt="" className='shadow-sm shadow-gray-400' />
                    <h1 className='text-2xl font-bold'>No Channel</h1>
                    <div className='flex justify-center'>
                        <button className='border-2 border-gray-700 shadow-md shadow-gray-700 px-10 py-2 rounded-lg font-bold'
                            onClick={handleAddChannel}
                        >
                            Add Channel
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default YoutuberChannel