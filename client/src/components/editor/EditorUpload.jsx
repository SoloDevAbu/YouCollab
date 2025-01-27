import React, { useState } from 'react'
import uploadIcon from '../../assets/logo/upload.png'

const EditorUpload = () => {
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [tags, setTags] = useState([]);
    const [videoSrc, setVideoSrc] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'title') {
            setTitle(value);
        } else if (name === 'description') {
            setDescription(value);
        } else if (name === 'tags') {
            setTags(value.split(' '));
        }
    };


    const importVideo = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'video/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const videoURL = URL.createObjectURL(file);
                setVideoSrc(videoURL);
            }
        };
        input.click();
    }


    const uploadVideo = () => {
        
    }

    return (
        <div className='p-6 md:p-10'>
            <h1 className='text-2xl font-sans font-semibold'>Upload a new Video</h1>
            <div
                className='border-2 border-dashed border-blue-400 flex flex-col items-center rounded-lg px-10 py-14 my-5 bg-neutral-200 relative cursor-pointer'
                onClick={importVideo}
            >
                {videoSrc ? (
                    <video controls className="w-full h-auto mb-6 rounded-xl">
                        <source src={videoSrc} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <>
                        <img src={uploadIcon} alt="Upload icon" className='size-14 mb-6' />
                        <p className='absolute bottom-0 mb-2 text-center'>Click to open file <br />or <span className='text-blue-400'>Drag and drop file</span></p>
                    </>
                )}
            </div>
            <div className='bg-neutral-200 px-6 py-6 rounded-lg'>
                <form action="" className='flex flex-col gap-3' onSubmit={uploadVideo}>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="text">Title <span className='text-red-500'>*</span></label>
                        <input type="text"
                            className="rounded-md py-2 px-3 leading-ti</div>ght outline-none"
                            name="title"
                            placeholder="Title of the video"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="text">Description <span className='text-red-500'>*</span></label>
                        <input type="text"
                            className="rounded-md py-2 px-3 leading-tight outline-none"
                            name="description"
                            placeholder="Description of the video"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="text">Tags <span className='text-red-500'>*</span></label>
                        <input type="text"
                            className="rounded-md py-2 px-3 leading-tight outline-none"
                            name="tags"
                            placeholder="Tags of the video"
                            onChange={handleInputChange}
                        />
                    </div>

                </form>
            </div>
            <div className='flex justify-center'>
                <button
                    className='bg-blue-500 px-6 py-2 rounded-lg mt-5 text-white font-sans font-semibold'
                    type='submit'
                >
                    Upload Video
                </button>
            </div>
        </div>
    )
}

export default EditorUpload