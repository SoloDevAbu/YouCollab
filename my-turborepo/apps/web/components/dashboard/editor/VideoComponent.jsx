import React from 'react'

const VideoComponent = ({videoSrc, title, description, tags, status, date}) => {
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
            return 'text-yellow-500';
            case 'rejected':
            return 'text-red-500';
            case 'approved':
            return 'text-green-500';
            default:
            return 'text-blue-500';
        }
    };

    return (
        <div className='flex flex-col gap-4 m-2 p-2'>
            <div className='flex flex-wrap justify-around border-2 border-gray-600 shadow-md shadow-slate-900 p-4 rounded-lg gap-1'>
                <video src={videoSrc} className='max-h-64 rounded-lg' controls></video>
                <div className='flex flex-col bg-slate-900 p-4 rounded-lg text-white font-semibold '>
                    <h1>Uploaded at: <br />{date}</h1>
                    <p>Status: <span className={getStatusColor(status)}>{status}</span></p>
                </div>
            </div>
            <div className='border-2 border-gray-600 shadow-md shadow-slate-900 rounded-lg p-4'>
                <h1 className='font-bold'>Title:</h1>
                <p className='font-semibold'>{title}</p>
                <h1 className='font-bold'>Description:</h1>
                <p className='font-semibold'>{description}</p>
                <h1 className='font-bold'>Tags:</h1>
                <div className='flex gap-2 flex-wrap'>
                    {Array.isArray(tags) && tags.length > 0 ? (
                        tags.map((tag, index) => (
                            <p key={index} className='bg-orange-200 px-2 py-1 rounded-lg my-1'>{tag}</p>
                        ))
                    ) : (
                        <p className='bg-orange-200 px-2 py-1 rounded-lg my-1'>No Tag</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default VideoComponent