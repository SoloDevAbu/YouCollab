import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VideoComponent from './VideoComponent';

const RecentUpload = () => {
    const [videos, setVideos] = useState([]);
    const [editingVideoId, setEditingVideoId] = useState(null);
    const [editVideo, setEditVideo] = useState(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // Fetch videos from backend
    useEffect(() => {
        const fetchRecentVideos = async () => {
            try {
                const response = await axios.get(`${backendUrl}/video/editor/videos`, {
                    withCredentials: true,
                });

                if (response.data.success) {
                    setVideos(response.data.videos);
                }
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchRecentVideos();
    }, []);

    const handleEditClick = (video) => {
        if (video.status !== 'PENDING') {
            alert('Editing is only allowed for videos with PENDING status.');
            return;
        }

        setEditingVideoId(video._id);
        setEditVideo({ ...video });
    };

    const handleSaveClick = () => {
        
        const updateVideo = async () => {
            try {
                const response = await axios.put(`${backendUrl}/video/editor/edit/${editingVideoId}`, {
                    title: editVideo.title,
                    description: editVideo.description,
                    tags: editVideo.tags
                }, {
                    withCredentials: true
                })
                if(response.data.success) {
                    // alert('video updated successfully')
                    const updatedResponse = await axios.get(`${backendUrl}/video/editor/videos`, {
                        withCredentials: true,
                    });
        
                    if (updatedResponse.data.success) {
                        setVideos(updatedResponse.data.video);
                    }
                    setEditingVideoId(null);
                }
            } catch (error) {
                console.error('Error updating video', error)
                alert(error.response?.data?.message || "Something went wrong");
            }
        }
        updateVideo();
    };

    return (
        <div className='flex flex-col gap-6 bg-gray-200 m-4 p-4 rounded-lg'>
            {/* Render all videos */}
            {videos.length > 0 ? (
                videos.map((video) => (
                    <div key={video._id} className='bg-white p-4 rounded-lg shadow-md'>
                        <VideoComponent
                            videoSrc={video.presignedUrl}
                            title={video.title}
                            description={video.description}
                            tags={video.tags.length > 0 ? video.tags : ['No Tags']}
                            status={video.status}
                            date={new Date(video.createdAt).toLocaleString()}
                        />
                        {video.status === 'PENDING' && (
                            <div className='flex justify-center mt-2'>
                                <button
                                    className='bg-blue-500 rounded-lg px-6 py-2 text-white font-bold'
                                    onClick={() => handleEditClick(video)}
                                >
                                    Edit Video
                                </button>
                            </div>
                        )}

                        {/* edit section */}
                        {editingVideoId === video._id && editVideo && (
                            <div className='bg-gray-300 rounded-lg p-4 mt-4' id='edit-section'>
                                <h1 className='font-bold'>Edit Title:</h1>
                                <input
                                    type='text'
                                    value={editVideo.title}
                                    onChange={(e) => setEditVideo({ ...editVideo, title: e.target.value })}
                                    className='w-full p-2 rounded-lg mb-4 outline-none'
                                />
                                <h1 className='font-bold'>Edit Description:</h1>
                                <textarea
                                    value={editVideo.description}
                                    onChange={(e) => setEditVideo({ ...editVideo, description: e.target.value })}
                                    className='w-full p-2 rounded-lg mb-4 outline-none'
                                />
                                <h1 className='font-bold'>Edit Tags:</h1>
                                <input
                                    type='text'
                                    value={editVideo.tags.join(', ')}
                                    onChange={(e) => setEditVideo({ ...editVideo, tags: e.target.value.split(', ') })}
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
                ))
            ) : (
                <p className='text-center text-gray-500 font-bold'>No recent uploads found.</p>
            )}
        </div>
    );
};

export default RecentUpload;
