import React, { useEffect, useState } from 'react'
import axios from 'axios'
import thumbnail from '../../../assets/Untitled (2).png'
import VideoComponent from './VideoComponent';

const RecentUpload = () => {
    const [title, setTitle] = useState(['']);
    const [description, setDescription] = useState(['']);
    const [tags, setTags] = useState([]);
    const [status, setStatus] = useState('PENDING');
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState({title});
    const [editDescription, setEditDescription] = useState({description});
    const [editTags, setEditTags] = useState({tags});

    const backeendUrl = import.meta.env.VITE_BACKEND_URL;

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

    useEffect(() => {
        const fetchRecentVideos = async () => {
            try {
                const videos = await axios.get(`${backeendUrl}/video/editor/videos`, {
                    withCredentials: true,
                });

                if(videos.data.success) {
                    setTitle(videos.data.video.title);
                    setDescription(videos.data.video.description);
                    setStatus(videos.data.status);
                    if (Array.isArray(videos.data.video.tags)) {
                        setTags(videos.data.video.tags);
                    } else {
                        setTags([]);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchRecentVideos();
    }, [])


    return (
        <div className='flex flex-col gap-6 bg-gray-200 m-4 p-4 rounded-lg'>
            <VideoComponent thumbnail={thumbnail} title={title} description={description} tags={tags.length > 0 ? tags : ['No Tags']} status={'Pending'}/>
            <div className='flex justify-center'>
                <button className='bg-blue-500 rounded-lg px-6 py-2 text-white font-bold' onClick={handleEditClick}>Edit Video</button>
            </div>
            {isEditing && (
                <div className='bg-gray-300 rounded-lg p-4 mt-4' id='edit-section'>
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
        </div>
    )
}

export default RecentUpload