import React, { useEffect, useState } from 'react'
import thumbnail from '../../../assets/Untitled (2).png'

const RecentUpload = ({title, description, tags=[]}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState({title});
    const [editDescription, setEditDescription] = useState({description});
    const [editTags, setEditTags] = useState({tags});

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        //Call the backend and edit the meta data of the uploaded video
    };

    useEffect(() => {
        if (isEditing) {
            document.getElementById('edit-section').scrollIntoView({ behavior: 'smooth' });
        }
    }, [isEditing])


    return (
        <div className='flex flex-col gap-6 bg-gray-200 mt-4 p-4 rounded-lg'>
            <div className='flex justify-around bg-gray-300 p-4 rounded-lg'>
                <img src={thumbnail} alt="" className='max-h-64' />
                <div className='flex flex-col bg-gray-400 p-4 rounded-lg text-white font-semibold '>
                    <h1>Uploaded at: 01/02/2025 5:13PM</h1>
                    <p>Status: <span className='text-blue-500'>Pending</span></p>
                </div>
            </div>
            <div className='bg-gray-300 rounded-lg p-4'>
                <h1 className='font-bold'>Titile:</h1>
                <p className='font-semibold'>{title}</p>
                <h1 className='font-bold'>Description:</h1>
                <p className='font-semibold'>{description}</p>
                <h1 className='font-bold'>Tags:</h1>
                <div className='flex gap-2 flex-wrap'>
                    {tags.map((tag, index) => (
                        <p key={index} className='bg-orange-200 px-2 py-1 rounded-lg my-1'>{tag}</p>
                    ))}
                </div>
            </div>
            <div className='flex justify-center'>
                <button className='bg-blue-500 rounded-lg px-6 py-2 text-white font-bold' onClick={handleEditClick}>Edit Video</button>
            
            </div>
            {isEditing && (
                <div className='bg-gray-300 rounded-lg p-4 mt-4'
                    id='edit-section'
                >
                    <h1 className='font-bold'>Edit Title:</h1>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className='w-full p-2 rounded-lg mb-4 outline-none'
                    />
                    <h1 className='font-bold'>Edit Description:</h1>
                    <textarea
                        value={description}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className='w-full p-2 rounded-lg mb-4 outline-none'
                    />
                    <h1 className='font-bold'>Edit Tags:</h1>
                    <input
                        type='text'
                        value={tags}
                        onChange={(e) => setEditTags(e.target.value)}
                        className='w-full p-2 rounded-lg mb-4 outline-none'
                    />
                    <div className='flex justify-center'>
                        <button
                            className='bg-green-500 rounded-lg px-6 py-2 text-white font-bold'
                            onClick={handleSaveClick}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </div >
    )
}

export default RecentUpload