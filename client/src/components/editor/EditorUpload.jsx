import React from 'react'
import uploadIcon from '../../assets/logo/upload.png'

const EditorUpload = () => {
  return (
    <div className='p-6 md:p-10'>
        <h1 className='text-2xl font-sans font-semibold'>Upload a new Video</h1>
        <div className='border-2 border-dashed border-blue-400 flex flex-col items-center rounded-lg px-10 py-14 my-5 bg-neutral-200 relative'>
            <img src={uploadIcon} alt="Upload icon" className='size-14 mb-6'/>
            <p className='absolute bottom-0 mb-2 text-center'>Click to open file <br />or <span className='text-blue-400'>Drag and drop file</span></p>
        </div>
        <div className='bg-neutral-200 px-6 py-6 rounded-lg'>
            <form action="" className='flex flex-col gap-3'>
                <div className='flex gap-3 items-center'>
                    <label htmlFor="text">Title <span className='text-red-500'>*</span></label>
                    <input type="text" 
                         className="rounded-md py-2 px-3 leading-tight"
                         name="title"
                         placeholder="Title of the video"
                    />
                </div>
                <div className='flex gap-3 items-center'>
                    <label htmlFor="text">Description <span className='text-red-500'>*</span></label>
                    <input type="text" 
                         className="rounded-md py-2 px-3 leading-tight"
                         name="description"
                         placeholder="Description of the video"
                    />
                </div>
                <div className='flex gap-3 items-center'>
                    <label htmlFor="text">Tags <span className='text-red-500'>*</span></label>
                    <input type="text" 
                         className="rounded-md py-2 px-3 leading-tight"
                         name="tags"
                         placeholder="Tags of the video"
                    />
                </div>
                
            </form>
        </div>
        <div className='flex justify-center'>
            <button className='bg-blue-500 px-6 py-2 rounded-lg mt-5 text-white font-sans font-semibold'>Upload Video</button>
        </div>
    </div>
  )
}

export default EditorUpload